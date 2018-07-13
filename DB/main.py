from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['POST'])
def index():
    value = request.json['opcode']
    return value

@app.route('/', methods=['GET'])
def response():
    result = "Pong"
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
