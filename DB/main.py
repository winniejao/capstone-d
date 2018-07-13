from Form import form
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def index():
    value = request.json['opcode']

    #Instantiate a new object of the class
    #Form or Manaul (Based on opcodes)

    #Do a request.json[''] to the other request fields
    #and set the variables in the form class

    #if else "switch" statement to call methods
    #from request to perform on new form object
    return value

@app.route('/', methods=['GET'])
def response():
    result = "Pong"
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
