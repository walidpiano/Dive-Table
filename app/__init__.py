from flask import Flask
import os

app = Flask(__name__)


folder_path = os.path.abspath(os.path.dirname(__file__))

if __name__ == "__main__":
    app.run()

from app import views


