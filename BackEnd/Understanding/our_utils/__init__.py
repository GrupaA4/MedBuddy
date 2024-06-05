import time
import os
import spacy

print("Loading spacy model...")
time1 = time.time()
nlp = spacy.load('en_core_sci_lg-0.5.4/en_core_sci_lg/en_core_sci_lg-0.5.4')
time2 = time.time()
print("Loaded spacy model in {:.2f} seconds".format(time2 - time1))

INPUT_FILE_NAME = 'medbuddyComGtoU.txt'
OUTPUT_FILE_NAME = 'medbuddyComUtoD.txt'

INPUT_FILE_NAME_DIAGNOSTIC = 'medbuddyComDtoU.txt'
# Create a set of stop words
stop_words = spacy.lang.en.stop_words.STOP_WORDS


def remove_stop_words(sentence):
    new_sentence = sentence.replace(",", "")
    new_sentence = new_sentence.replace(".", "")

    print(new_sentence)

    doc = nlp(new_sentence)

    filtered_tokens = [token for token in doc if not token.is_stop]

    return filtered_tokens


def READ_INPUT_FILE():
    with open(INPUT_FILE_NAME, 'r') as f:
        final = remove_stop_words(f.read())
        f.close()
        return final


# Function to get the modification time of the file
def get_modification_time(file_path):
    return os.path.getmtime(file_path)


# Store the initial modification time


# Function to check if the file has been modified
def check_if_modified(file_path, last_mod_time):
    current_mod_time = get_modification_time(file_path)
    if current_mod_time != last_mod_time:
        print("File has been modified")
        return True, current_mod_time
    else:
        time.sleep(1)
        return False, last_mod_time


def OUTPUT_RESPONSE(RESULT):
    with open(OUTPUT_FILE_NAME, 'w') as f:
        for component in RESULT:
            f.write(component)
            f.write(" ")

        f.write("\n")
        f.close()


def make_pairs(input_sequence, gotted_len, clean_text_splitted):
    current_seq_list = []
    current_sequences_rez = []
    sequences_formed = 0
    inside_sequence = False

    for i in range(gotted_len):
        if input_sequence[i] == "B_SYM":
            if inside_sequence:
                # Finalize the current sequence if we're already inside one
                current_sequences_rez.append(current_seq_list)
                sequences_formed += 1
                current_seq_list = []
            # Start a new sequence
            current_seq_list.append(clean_text_splitted[i])
            inside_sequence = True
        elif input_sequence[i] == "I_SYM" and inside_sequence:
            # Continue the current sequence
            current_seq_list.append(clean_text_splitted[i])
        elif input_sequence[i] == "NONE":
            if inside_sequence:
                # Finalize the current sequence if we're inside one
                current_sequences_rez.append(current_seq_list)
                sequences_formed += 1
                current_seq_list = []
                inside_sequence = False

    # Finalize any remaining sequence
    if inside_sequence:
        current_sequences_rez.append(current_seq_list)
        sequences_formed += 1

    return current_sequences_rez, sequences_formed
