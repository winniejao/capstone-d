import Form
import json
import request
from flask import Flask, request, jsonify

app = Flask(__name__)

################ FORM BANK ##################
@app.route('/equipment/form/', methods=['POST'])
def rAddForm():
    try:
        getRequest = json.loads(request.data)
        reqHandle = req.add_form(getRequest)
        return "form POST Success!"
    except:
        return "Error: form POST failed"

@app.route('/equipment/form/', methods=['GET'])
def rGetForm():
        try:
            result = "form GET Success!"
            return jsonify(result)
        except:
             return "Error: form GET failed"

@app.route('/equipment/form<id>', methods=['DELETE'])
def rDeleteForm():
    try:
        getRequest = json.loads(request.data)

        return "form DELETE Success!"
    except:
        return "Error: form DELETE failed"

@app.route('/equipment/form<id>', methods=['PUT'])
def rAlterForm():
    try:
        getRequest = json.loads(request.data)
        return "from PUT Success!"
    except:
        return "Error: form PUT failed"

################ SUB BANK ##################
@app.route('/landscape/sub/<name>', methods=['POST'])
def rLandscapeSub():
    try:
        getRequest = json.loads(request.data)
        print getRequest
        return "POST Success!"
    except:
        return "Error: POST failed"

@app.route('/equipment/sub/<name>', methods=['POST'])
def rEquipmentSub():
    try:
        getRequest = json.loads(request.data)
        print getRequest
        return "POST Success!"
    except:
        return "Error: POST failed"

@app.route('/tools/sub/<name>', methods=['POST'])
def rToolSub():
    try:
        getRequest = json.loads(request.data)
        print getRequest
        return "POST Success!"
    except:
        return "Error: POST failed"

################ GET BANK ##################
@app.route('/landscape/<string>', methods=['GET'])
def rLandscapeGet():
    try:
        result = "landscape GET Success"
        return jsonify(result)
    except:
         return "Error: GET failed"

@app.route('/equipment/<string>', methods=['GET'])
def rEquipmentGet():
    try:
        result = "equipment GET Success"
        return jsonify(result)
    except:
         return "Error: GET failed"

@app.route('/tools/<string>', methods=['GET'])
def rToolsGet():
    try:
        result = "tools GET Success"
        return jsonify(result)
    except:
         return "Error: GET failed"

if __name__ == '__main__':
    app.run(debug=True, port=5000)
