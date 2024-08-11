# Tech Test

This project is a full-stack featuring a ReactJs + Bootstrap frontend and a Flask backend which consumes a given JSON file populated with questions. The frontend provides a dynamic user interface for interacting with the application's features, while the backend serves as the API layer, handling data management and processing

The setup instructions below will guide you through getting both the frontend and backend up and running, as well as how to test each part of the application

It is recommended to have 2 terminals running - one for the frontend and one for the backend

## Frontend - setting up and running

Use a local web server to point to the files in `/frontend/`

If you have node installed you should be able to `npm install && npm start` to spin up a local server using the `http-server` module.

This runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Frontend - testing

run `npm test` in the `/frontend/` directory

## Backend - setting up and running

Navigate to `/backend/`

If you have Python 3.x installed, you should be able to create a virtual environment using `python -m venv venv`, activate using `source venv/bin/activate` on macOS/Linux or `venv/Scripts/activate` on Windows

Install dependencies using `pip install -r requirements.txt`

Run using `python app.py` or `flask run`

The Flask server runs in development mode

Visit [http://127.0.0.1:5000](http://127.0.0.1:5000) to access the API endpoints

## Frontend - testing

run `python -m unittest discover tests` in the `/backend/` directory
