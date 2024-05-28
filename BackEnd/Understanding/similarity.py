import pandas as pd
import spacy
from sklearn.metrics.pairwise import cosine_similarity
import gensim.downloader as api

#Pentru el trebuie cel putin un model glove care are aprox 500 mb si cand se 
# deschide programul trebuie asteptat cateva secunde dupa care e aproape instant

# model = api.load("glove-wiki-gigaword-100")
# nlp = spacy.load("en_core_web_lg")
nlp = spacy.load("en_core_sci_lg")

def is_multi_word(word):

    return ' ' in word


def test_multi_word_composition(word):

    if is_multi_word(word):
        return True

    return False


# def test_set_elements_word_composition(word_set):
#     number_of_multi_words = 0
#
#     for word in word_set:
#         if test_multi_word_composition(word):
#             print("Multi-word:", word)
#             words = word.split()
#
#             result_word = word_arithmetic(*words)
#             print("Result:", result_word)
#
#             number_of_multi_words += 1
#
#     # print(number_of_multi_words)


def check_similarity_with_glove(word, words_set):
    """
    Check the similarity between a given word and each word in a set of words using GloVe embeddings.

    Args:
    - word (str): The word to compare
    - words_set (set): Set of words to compare against
    """

    word_vector = nlp(word).vector

    similar_words = []

    for word_in_set in words_set:
        word_in_set_vector = nlp(word_in_set).vector
        similarity_score = cosine_similarity([word_vector], [word_in_set_vector])[0][0]
        if similarity_score > 0.4:  #JOACA TE CU VALOAREA
            similar_words.append((word_in_set, similarity_score))

    similar_words.sort(key=lambda x: x[1], reverse=True)

    top_similar_words = similar_words[:3]

    return top_similar_words


def extract_words_from_excel(file_path):
    """
    Extract words from the first row of an Excel file, excluding the first two elements.
    """

    headers_df = pd.read_excel(file_path, nrows=1)

    headers_list = list(headers_df.columns)

    header_set = {header.split(',')[0].strip().lower() for header in headers_list[2:]}

    return header_set


# def word_arithmetic(*words):
#     try:
#         word_vectors = [model[word] for word in words]
#     except KeyError as e:
#         print(f"Error: Word '{e}' not present in the model's vocabulary.")
#         return None
#
#     result_vector = sum(word_vectors)
#
#     try:
#         most_similar_words = model.similar_by_vector(result_vector, topn=1)
#         return most_similar_words[0]
#     except KeyError as e:
#         print(f"Error: No similar word found for the result vector.")
#         return None


file_path = './diagnostic_db.xlsx'

word_to_check = "bad breath"

words_set = extract_words_from_excel(file_path)

similar_words = check_similarity_with_glove(word_to_check, words_set)
print(f"Words similar to '{word_to_check}':")
print(similar_words)

# test_set_elements_word_composition(words_set)
# words = word_to_check.split()
# result_word = word_arithmetic(*words)
# print("Result:", result_word)



doc = nlp("Last night i had shivers, i started coughing 2 days ago extremely hard and since i've met my mother, i felt dizzy and i have breath shortness regulary i cant eat anymore because im so weak and sometimes i even have high fever, should i visit a doctor and together with that i vomited a lot?")

for entity in doc.ents:
    print(f"Words similar to '{entity.text}':")
    similar_words = check_similarity_with_glove(entity.text, words_set)
    print(similar_words)