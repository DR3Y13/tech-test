"""
This module provides a simple Flask application that serves a JSON API.

The API has a single endpoint `/api/questions` which returns questions
from a JSON file. CORS is enabled to allow cross-origin requests.
"""
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/api/questions', methods=['GET'])
def get_questions():
    """Endpoint to get questions from the API."""
    with open('api.json', encoding='utf-8') as f:
        data = f.read()
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True)
