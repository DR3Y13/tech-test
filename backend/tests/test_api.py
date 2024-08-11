"""
Unit tests for the Flask API in `app.py`
Usage:
    Run with `python -m unittest discover tests` 
"""
import unittest
import json
from unittest.mock import patch, mock_open
from app import app, validate_question


class TestAPI(unittest.TestCase):
    """
    Unit tests for the Flask API

    Methods:
        setUp(self): Initialises the Flask test client
        test_get_questions(self): Tests GET /api/questions endpoint
        test_add_question(self): Tests POST /api/questions endpoint
        test_add_question_invalid_data(self): Tests POST /api/questions endpoint with invalid data
        test_validate_question(self): Tests validate_question function
    """

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    @patch("builtins.open", new_callable=mock_open, read_data='{"questions": []}')
    def test_get_questions(self, _mock_file):
        """Test the GET /api/questions endpoint"""
        response = self.app.get('/api/questions')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIn("questions", data)
        self.assertIsInstance(data["questions"], list)

    @patch("builtins.open", new_callable=mock_open, read_data='{"questions": []}')
    @patch("app.json.dump")
    def test_add_question(self, mock_json_dump, mock_file):
        """Test the POST /api/questions endpoint"""
        new_question = {
            "id": 999,
            "title": "What is your favourite programming language?",
            "fields": [
                {"element": "input", "type": "text", "placeholder": "e.g Python"}
            ]
        }
        response = self.app.post('/api/questions', json=new_question)
        self.assertEqual(response.status_code, 201)
        data = json.loads(response.data)
        self.assertEqual(data["message"], "Question added successfully!")
        mock_json_dump.assert_called_once_with(
            {"questions": [new_question]}, mock_file(), indent=2)

    @patch("builtins.open", new_callable=mock_open, read_data='{"questions": []}')
    @patch("app.json.dump")
    def test_add_question_invalid_data(self, mock_json_dump, _mock_file):
        """Test the POST /api/questions endpoint with invalid data."""
        invalid_question = {
            "id": 1000,
            "title": "Invalid Question",
        }

        response = self.app.post('/api/questions', json=invalid_question)
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn("error", data)
        mock_json_dump.assert_not_called()

    def test_validate_question(self):
        """Test the validate_question function"""
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
        }
        is_valid, error_message = validate_question(invalid_question)
        self.assertFalse(is_valid)
        self.assertEqual(error_message, "Missing required fields: {'fields'}")


if __name__ == '__main__':
    unittest.main()
