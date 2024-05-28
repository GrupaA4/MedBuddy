import json
import random
import os


def load_questions(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    question_blocks = content.split("\n\n")
    questions_dict = {}

    for block in question_blocks:
        lines = block.split("\n")
        if lines:
            specialization = lines[0].strip().replace("### ", "")
            questions = [line.strip() for line in lines[1:] if line.strip()]
            questions_dict[specialization] = questions

    return questions_dict


def load_specialization(json_file_path):
    with open(json_file_path, 'r') as file:
        data = json.load(file)
    return data.get('specialization')


def load_asked_questions(json_file_path):
    try:
        with open(json_file_path, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {}


def write_random_question(questions_dict, specialization, output_file, asked_questions):
    if specialization in questions_dict:
        questions = questions_dict[specialization]
        unanswered_questions = [question for question in questions if
                                question not in asked_questions.get(specialization, [])]

        if unanswered_questions:
            random_question = random.choice(unanswered_questions)
            data = {"specialization": specialization, "question": random_question}
            with open(output_file, 'w') as file:
                file.write("#")
                json.dump(data["question"], file, indent=4)
                file.write("#")
            print(f"Random question written to {output_file}")

            asked_questions.setdefault(specialization, []).append(random_question)
            with open("asked_questions.json", 'w') as file:
                json.dump(asked_questions, file, indent=4)

            if sum(len(questions) for questions in asked_questions.values()) >= 5:
                os.remove("asked_questions.json")
                print("Asked questions file deleted.")
        else:
            print(f"All questions for specialization {specialization} have been asked.")
    else:
        print(f"Specialization: {specialization} not found in the questions list.")


questions_dict = load_questions("questions.txt")
specialization = load_specialization("specialization.json")
asked_questions = load_asked_questions("asked_questions.json")
write_random_question(questions_dict, specialization, "medbuddyComGU.txt", asked_questions)
