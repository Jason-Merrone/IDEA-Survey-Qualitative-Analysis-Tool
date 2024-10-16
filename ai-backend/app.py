from flask import Flask, request
import random

app = Flask(__name__)

# TEST ENDPOINTS
# Below are test endpoints. They are stand ins for the real endpoints but do not require the LLMs to be active. Used for testing purposes.

@app.post('/summary-test')
def summary_test():
    request_data = request.get_json()
    response = {"summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
    return response, 201

@app.post('/semantic-test')
def semantic_test():
    request_data = request.get_json()

    sentiment = random.randint(0,2)

    attribute = "explanatory"
    if(sentiment == 0):
        attribute = "grading"
    elif(sentiment == 1):
        attribute = None

    
    response = {"data":[{"attribute": attribute, "Sentiment": sentiment}]}
    return response, 201
