import json
import time

import numpy as np
import torch
import torch.nn as nn
from gensim.models import Word2Vec


# model
class LSTMCell(nn.Module):
    def __init__(self, input_dim, hidden_dim, num_classes):
        super(LSTMCell, self).__init__()
        self.input_dim = input_dim
        self.hidden_dim = hidden_dim
        self.num_classes = num_classes

        # Make them parameters so they can be tuned
        self.Wf = nn.Parameter(torch.randn(hidden_dim, input_dim + hidden_dim) * 0.01)
        self.Wi = nn.Parameter(torch.randn(hidden_dim, input_dim + hidden_dim) * 0.01)
        self.Wc = nn.Parameter(torch.randn(hidden_dim, input_dim + hidden_dim) * 0.01)
        self.Wo = nn.Parameter(torch.randn(hidden_dim, input_dim + hidden_dim) * 0.01)
        self.Wy = nn.Parameter(torch.randn(num_classes, hidden_dim) * 0.01)

        self.bf = nn.Parameter(torch.zeros(hidden_dim))
        self.bi = nn.Parameter(torch.zeros(hidden_dim))
        self.bc = nn.Parameter(torch.zeros(hidden_dim))
        self.bo = nn.Parameter(torch.zeros(hidden_dim))
        self.by = nn.Parameter(torch.zeros(num_classes))

    def forward(self, x):
        batch_size, sequence_length, _ = x.size()
        # Initialize with zero
        h_prev = torch.zeros(batch_size, self.hidden_dim).to(x.device)
        c_prev = torch.zeros(batch_size, self.hidden_dim).to(x.device)
        all_hiddens = torch.zeros(batch_size, sequence_length, self.hidden_dim).to(x.device)
        all_outputs = torch.zeros(batch_size, sequence_length, self.num_classes).to(x.device)

        # The LSTM Cell calculations implemented
        for t in range(sequence_length):
            xt = x[:, t, :]
            combined = torch.cat((h_prev, xt), dim=1)

            ft = torch.sigmoid(combined @ self.Wf.T + self.bf)
            it = torch.sigmoid(combined @ self.Wi.T + self.bi)
            ct_ = torch.tanh(combined @ self.Wc.T + self.bc)
            ot = torch.sigmoid(combined @ self.Wo.T + self.bo)

            c_curr = ft * c_prev + it * ct_
            h_curr = ot * torch.tanh(c_curr)

            h_prev = h_curr
            c_prev = c_curr
            all_hiddens[:, t, :] = h_curr

            output_raw = h_curr @ self.Wy.T + self.by
            all_outputs[:, t, :] = torch.softmax(output_raw, dim=1)

        return all_hiddens, all_outputs

    # Save the weights and biases
    def save_model(self, filename):
        model_params = {
            'Wf': self.Wf.detach().cpu().numpy().tolist(),
            'Wi': self.Wi.detach().cpu().numpy().tolist(),
            'Wc': self.Wc.detach().cpu().numpy().tolist(),
            'Wo': self.Wo.detach().cpu().numpy().tolist(),
            'Wy': self.Wy.detach().cpu().numpy().tolist(),
            'bf': self.bf.detach().cpu().numpy().tolist(),
            'bi': self.bi.detach().cpu().numpy().tolist(),
            'bc': self.bc.detach().cpu().numpy().tolist(),
            'bo': self.bo.detach().cpu().numpy().tolist(),
            'by': self.by.detach().cpu().numpy().tolist()
        }
        with open(filename, 'w') as f:
            json.dump(model_params, f)

    # Load the weights and biases
    def load_model(self, filename):
        with open(filename, 'r') as f:
            model_params = json.load(f)
        self.Wf = nn.Parameter(torch.tensor(model_params['Wf']))
        self.Wi = nn.Parameter(torch.tensor(model_params['Wi']))
        self.Wc = nn.Parameter(torch.tensor(model_params['Wc']))
        self.Wo = nn.Parameter(torch.tensor(model_params['Wo']))
        self.Wy = nn.Parameter(torch.tensor(model_params['Wy']))
        self.bf = nn.Parameter(torch.tensor(model_params['bf']))
        self.bi = nn.Parameter(torch.tensor(model_params['bi']))
        self.bc = nn.Parameter(torch.tensor(model_params['bc']))
        self.bo = nn.Parameter(torch.tensor(model_params['bo']))
        self.by = nn.Parameter(torch.tensor(model_params['by']))


label_to_index = {
    "NONE": 0,
    "B_SYM": 1,
    "I_SYM": 2
}
embedding_dim = 100
input_dim = embedding_dim
hidden_dim = 128
num_classes = len(label_to_index)

############

max_seq_len = 270
input_dim = max_seq_len
hidden_dim = 128
embedding_dim = 150
num_classes = 3

print("Loading Word2vec Model...")
time1 = time.time()
word2vec_model = Word2Vec.load("word2vec_req_model")  # word2vec model
time2 = time.time()
print("Loaded Word2vec Model in {:.2f} seconds".format(time2 - time1))


def init_MODEL():
    lstm_cell = LSTMCell(input_dim=input_dim, hidden_dim=hidden_dim, num_classes=num_classes)
    lstm_cell.load_model("our_lstm.json")  # our model
    print("Model Loaded successfully")
    return lstm_cell


def analyze(lstm_cell, text):
    # LSTM model
    # Create a Word2Vec model (in practice, use a pre-trained model)
    # word2vec_model = Word2Vec(vector_size=embedding_dim, window=5, min_count=1, workers=4)
    # word2vec_model.build_vocab([text.split()])  # Necessary to build vocabulary for the input text

    # word2vec_model.train([text.split()], total_examples=1, epochs=10)  # Train on the input text

    # Tokenize and embed the phrase
    test_sequence = text.split()
    embedded_sequence = [word2vec_model.wv[word] if word in word2vec_model.wv else np.zeros(embedding_dim) for word in
                         test_sequence]

    # Pad the sequence
    if len(embedded_sequence) < max_seq_len:
        padding = [np.zeros(embedding_dim) for _ in range(max_seq_len - len(embedded_sequence))]
        embedded_sequence.extend(padding)

        # Convert to tensor
        X_test = torch.tensor([embedded_sequence], dtype=torch.float32)

        # Get the model prediction
        lstm_cell.eval()
        with torch.no_grad():
            _, outputs = lstm_cell(X_test)
            preds = torch.argmax(outputs, dim=-1)

    # Print the predicted labels
    predicted_labels = [list(label_to_index.keys())[pred] for pred in preds[0].cpu().numpy()]
    phrase = text.split()
    print("Phrase: ", text.split())
    print("Labels: ", predicted_labels[:len(text.split())])
    output_set = set()
    output_set = set()  # Initialize an empty set to store the indices

    for index, label in enumerate(predicted_labels[:len(text.split())]):
        if label != "NONE":
            output_set.add(phrase[index])  # Add the word

    return output_set, predicted_labels, len(text.split())

############
