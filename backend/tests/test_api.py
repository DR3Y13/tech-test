"""
Unit tests for the Flask API in `app.py`.

Tests include:
- `GET /api/questions`: Verifies retrieval of questions.
- `POST /api/questions`: Validates adding questions, including error handling for invalid data.
- `validate_question` function: Ensures correct question structure.

Tests use Python's `unittest` framework with Flask's test client. 
Added data is cleaned up after each test.

Classes:
    TestAPI: Test cases for API endpoints and data validation.

Usage:
    Run with `python -m unittest discover` or `python test_api.py`.
"""


import unittest
import json
from app import app, validate_question


class TestAPI(unittest.TestCase):
    """

Methods:
    setUp(self): Initializes the Flask test client and tracks added questions.
    tearDown(self): Removes any questions added during the tests.
    test_get_questions(self): Tests the `GET /api/questions` endpoint.
    test_add_question(self): Tests adding a valid question with `POST /api/questions`.
    test_add_question_invalid_data(self): Tests handling of invalid data in `POST /api/questions`.
    test_validate_question(self): Tests the `validate_question` function.
"""

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True
        self.added_question_ids = []

    def tearDown(self):
        # Clean up added questions
        with open('api.json', 'r+', encoding='utf-8') as f:
            data = json.load(f)
            data['questions'] = [q for q in data['questions']
                                 if q['id'] not in self.added_question_ids]

            f.seek(0)
            json.dump(data, f, indent=2)
            f.truncate()

    def test_get_questions(self):
        """Test the GET /api/questions endpoint."""
        response = self.app.get('/api/questions')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn("questions", data)
        self.assertIsInstance(data["questions"], list)

    def test_add_question(self):
        """Test the POST /api/questions endpoint."""
        new_question = {
            "id": 999,
            "title": "What is your favorite programming language?",
            "fields": [
                {"element": "input", "type": "text", "placeholder": "e.g Python"}
            ]
        }

        # Add the new question
        response = self.app.post('/api/questions', json=new_question)
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data["message"], "Question added successfully!")

        # Track the added question ID for cleanup
        self.added_question_ids.append(new_question['id'])

    def test_add_question_invalid_data(self):
        """Test the POST /api/questions endpoint with invalid data."""
        invalid_question = {
            "id": 1000,
            "title": "Invalid Question",
            # Missing 'fields' key
        }

        response = self.app.post('/api/questions', json=invalid_question)
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn("error", data)

    def test_validate_question(self):
        """Test the validate_question function."""
        valid_question = {
            "id": 1,
            "title": "Valid question",
            "fields": [{"element": "input", "type": "text"}]
        }
        is_valid, error_message = validate_question(valid_question)
        self.assertTrue(is_valid)
        self.assertEqual(error_message, "")

        invalid_question = {
            "id": 1,
            "title": "Invalid question",
            # Missing 'fields' key
        }
        is_valid, error_message = validate_question(invalid_question)
        self.assertFalse(is_valid)
        self.assertEqual(error_message, "Missing required fields: {'fields'}")


if __name__ == '__main__':
    unittest.main()
