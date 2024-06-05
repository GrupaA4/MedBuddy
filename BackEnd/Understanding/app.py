import time

from flask import Flask

time_start_app = time.time()

time_flask_start = time.time()

time_flask_end = time.time()
print("Loaded FLASK PACKAGE in {:.2f} seconds".format(time_flask_end - time_flask_start))

time_start_our_lstm = time.time()
from our_lstm import LSTMCell
from our_lstm import input_dim
from our_lstm import hidden_dim
from our_lstm import analyze
from our_lstm import num_classes
from our_lstm import init_MODEL

from our_similarity import check_similarity_with_glove
from our_similarity import nlp

print("Loaded OUR_LSTM PACKAGE in {:.2f} seconds".format(time.time() - time_start_our_lstm))

from our_utils import READ_INPUT_FILE
from our_utils import make_pairs
from our_utils import OUTPUT_RESPONSE
from our_utils import check_if_modified
from our_utils import get_modification_time
from our_utils import INPUT_FILE_NAME
from our_utils import OUTPUT_FILE_NAME
from our_utils import INPUT_FILE_NAME_DIAGNOSTIC

print("Starting NLP MODULE...")
time1 = time.time()

# LSTM model
lstm_cell = LSTMCell(input_dim, hidden_dim, num_classes)

lstm_cell.num_classes = 3
lstm_cell.hidden_dim = 128
lstm_cell.embedding_dim = 100

lstm_cell.input_dim = lstm_cell.embedding_dim
lstm_cell = init_MODEL()

time2 = time.time()
loading_time_model = time2 - time1
print("Loaded NLP MODULE in {:.2f} seconds".format(loading_time_model))

app = Flask(__name__)
app.debug = True

time_start_app_end = time.time()
print("Loaded Application  in {:.2f} seconds".format(time_start_app_end - time_start_app))
RUNNING = True
FIRST_TIME = 0
lastThingRead = ""
CATEGORY_READ_FROM_D = ""

while RUNNING:
    print("Starting test...")
    print("Reading..")
    if FIRST_TIME == 1:
        while True:
            modified, last_mod_time = check_if_modified(INPUT_FILE_NAME, last_mod_time)
            if modified:
                print("Performing actions due to file modification...")
                inputReceived = READ_INPUT_FILE()
                break
                # Perform actions needed after file modification

    if FIRST_TIME == 0:
        inputReceived = READ_INPUT_FILE()
        last_mod_time = get_modification_time(INPUT_FILE_NAME)
        FIRST_TIME = 1
    print("I read")
    print(inputReceived)  # the clean input

    if inputReceived == "DONE":
        exit(0)

    cleaned_text = " ".join([token.text for token in inputReceived])
    print(cleaned_text)
    time_process1 = time.time()
    symptoms_set, predictions, predictions_len = analyze(lstm_cell, cleaned_text)
    time_process2 = time.time()
    print("Processing took {:.2f} seconds".format(time_process2 - time_process1))

    print("Output symptoms :")
    print(symptoms_set)

    seq_formed, seq_len = make_pairs(predictions, predictions_len, cleaned_text.split())

    print("Number of sequences formed : {}".format(seq_len))
    print("Sequences formed :")
    print(seq_formed)

    for i in range(seq_len):
        OUTPUT_SYMPTOMS = set()
        propozitie = " ".join(seq_formed[i])
        doc = nlp(propozitie)
        for entity in doc.ents:
            print(f"Words similar to '{entity.text}':")
            similar_words = check_similarity_with_glove(entity.text)
            print(similar_words)
            print("********")
            if similar_words:  # Check if the list is not empty
                for word_tuple in similar_words:
                    OUTPUT_SYMPTOMS.add(word_tuple[0])  # Retain the first component of each tuple

            if OUTPUT_SYMPTOMS:  # Check if the set is not empty
                print("I am writing!...")
                last_modified_diagnostic = get_modification_time(INPUT_FILE_NAME_DIAGNOSTIC)

                OUTPUT_RESPONSE(OUTPUT_SYMPTOMS)  # trimitem date
                print("Waiting for a category from Diagnostic")
                while True:
                    modified2, last_time_modified2 = check_if_modified(INPUT_FILE_NAME_DIAGNOSTIC,
                                                                       last_modified_diagnostic)
                    if modified2:
                        print("Reading category...")
                        with open(INPUT_FILE_NAME_DIAGNOSTIC, 'r') as frd:
                            CATEGORY_READ_FROM_D = frd.readline()
                            frd.close()
                            print(f"Category read {CATEGORY_READ_FROM_D}\n")
                        break
                        # Perform actions needed after file modification


# simiarly_set = check_similarity_with_glove()
# print(simiarly_set)


# while (there is data && appIS_ON)

@app.route('/')
def hello_world():
    print("Here is the web app!");
    # load our model

    # read input
    inputReceived = READ_INPUT_FILE()
    print(inputReceived)  # the clean input
    cleaned_text = " ".join([token.text for token in inputReceived])
    print(cleaned_text)

    symptoms_set = analyze(lstm_cell, cleaned_text)
    print("Output symptoms :")
    print(symptoms_set)

    return 'Hello World from python Flusk!'


if __name__ == '__main__':
    app.run()
