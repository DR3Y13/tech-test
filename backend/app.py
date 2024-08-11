"""
This module provides a simple Flask application that serves a JSON API.

The API has a single endpoint `/api/questions` which returns questions
from a JSON file. CORS is enabled to allow cross-origin requests.
"""
import json
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


def validate_question(data):
    """Validates the structure of a question object."""
    if not isinstance(data, dict):
        return False, "The question data must be a dictionary."

    required_fields = {"id", "title", "fields"}
    if not required_fields.issubset(data.keys()):
        return False, f"Missing required fields: {required_fields - data.keys()}"

    if not isinstance(data['fields'], list):
        return False, "'fields' must be a list."

    for field in data['fields']:
        if not isinstance(field, dict):
            return False, "Each field must be a dictionary."
        if 'element' not in field or 'type' not in field:
            return False, "Each field must have 'element' and 'type'."

    return True, ""


@app.route('/api/questions', methods=['GET'])
def get_questions():
    """Endpoint to get questions from the API."""
    with open('api.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    return jsonify(data)


@app.route('/api/questions', methods=['POST'])
def add_question():
    """Endpoint to add a new question to the API."""
    new_question = request.json

    is_valid, error_message = validate_question(new_question)
    if not is_valid:
        return jsonify({"error": error_message}), 400

    with open('api.json', 'r+', encoding='utf-8') as f:
        data = json.load(f)
        if any(q['id'] == new_question['id'] for q in data['questions']):
            return jsonify({"error": "A question with this ID already exists."}), 400
        data['questions'].append(new_question)

        f.seek(0)
        json.dump(data, f, indent=2)
        f.truncate()

    return jsonify({"message": "Question added successfully!"}), 201


if __name__ == '__main__':
    app.run(debug=True)
