import Form
import json
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def getRequest():
    try:
        getRequest = json.loads(request.data)
        print getRequest
        return "POST Success!"
    except:
        return "Error: POST failed"

@app.route('/', methods=['GET'])
def sendResponse():
    try:
        result = "Success"
        return jsonify(result)
    except:
         return "Error: GET failed"

if __name__ == '__main__':
    app.run(debug=True, port=8080)
