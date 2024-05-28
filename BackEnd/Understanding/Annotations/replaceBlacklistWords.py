import spacy
import re
import os

nlp = spacy.load("en_core_web_lg")


def replace_characters(input_text, characters_to_replace):
    for char in characters_to_replace:
        input_text = input_text.replace(char, ' ')
    return input_text


def replace_stopwords(input_text, nlp):
    doc = nlp(input_text)
    for token in doc:
        if token.is_stop:
            spaces = ' ' * len(token.text)
            input_text = re.sub(r'\b' + re.escape(token.text) + r'\b', spaces, input_text, flags=re.IGNORECASE)
    return input_text

def extract_texts_to_replace(ann_file, titles):

    texts_to_replace = []

    try:
        with open(ann_file, 'r') as file:
            for line in file:
                parts = line.split()
                if len(parts) >= 5:
                    title = parts[1]
                    if title in titles:
                        text = " ".join(parts[4:])
                        texts_to_replace.append(text)

    except FileNotFoundError:
        print(f"The file {ann_file} does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")

    return texts_to_replace

def replace_texts_in_file(txt_file, texts_to_replace):

    try:
        with open(txt_file, 'r') as file:
            text = file.read()

        for to_replace in texts_to_replace:
            spaces = ' ' * len(to_replace)
            text = re.sub(re.escape(to_replace), spaces, text)

        with open(txt_file, 'w') as file:
            file.write(text)

        print(f"Replacements complete. Changes written to {txt_file}.")

    except FileNotFoundError:
        print(f"The file {txt_file} does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")


def process_ann_file(ann_file, titles):
    modified_ann_file = os.path.splitext(ann_file)[0] + 'Modified.ann'

    try:
        with open(ann_file, 'r') as file:
            lines = file.readlines()

        with open(modified_ann_file, 'w') as file:
            for line in lines:
                parts = line.split()
                if len(parts) >= 2:
                    title = parts[1]
                    if title not in titles:
                        file.write(line)

        print(f"Modified .ann file written to {modified_ann_file}.")
        return modified_ann_file

    except FileNotFoundError:
        print(f"The file {ann_file} does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")

    return None

def process_files(ann_file, txt_file, characters_to_replace, nlp, titles):
    texts_to_replace = extract_texts_to_replace(ann_file, titles)
    modified_txt_file = os.path.splitext(ann_file)[0] + 'Modified.txt'

    try:
        with open(txt_file, 'r') as file:
            text = file.read()

        for to_replace in texts_to_replace:
            spaces = ' ' * len(to_replace)
            text = re.sub(re.escape(to_replace), spaces, text)

        text = replace_characters(text, characters_to_replace)
        text = replace_stopwords(text, nlp)

        with open(modified_txt_file, 'w') as file:
            file.write(text)

        print(f"Processing complete. Changes written to {txt_file}.")

    except FileNotFoundError:
        print(f"The file {txt_file} does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")

    process_ann_file(ann_file, titles)

titles = [
    "Dosage", "Medication", "Diagnostic_procedure", "POLARITY", "Therapeutical_procedure",
    "Disease_disorder", "BEFORE", "OVERLAP", "MODIFY", "AFTER", "IDENTICAL",
    "SUB_PROCEDURE", "Detailed_description", "Lab_value"
]

ann_file = '17803823.ann'
txt_file = os.path.splitext(ann_file)[0] + '.txt'
characters_to_replace = ',.!?'

process_files(ann_file, txt_file, characters_to_replace, nlp, titles)
