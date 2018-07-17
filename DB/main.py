import Form
import json
<<<<<<< HEAD
import request
=======
>>>>>>> 1021a79f622ea149e9defbbd189d4c10472457e6
from flask import Flask, request, jsonify

app = Flask(__name__)

################ FORM BANK ##################
<<<<<<< HEAD
@app.route('/equipment/form/', methods=['POST'])
def rAddForm():
    try:
        getRequest = json.loads(request.data)
        reqHandle = req.add_form(getRequest)
=======
@app.route('/equipment/form', methods=['POST'])
def rAddForm():
    try:
        getRequest = json.loads(request.data)
        print getRequest
>>>>>>> 1021a79f622ea149e9defbbd189d4c10472457e6
        return "form POST Success!"
    except:
        return "Error: form POST failed"

<<<<<<< HEAD
@app.route('/equipment/form/', methods=['GET'])
=======
@app.route('/equipment/form<id>', methods=['GET'])
>>>>>>> 1021a79f622ea149e9defbbd189d4c10472457e6
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
<<<<<<< HEAD
        return "from PUT Success!"
    except:
        return "Error: form PUT failed"

################ SUB BANK ##################
=======
        return "fomr PUT Success!"
    except:
        return "Error: form PUT failed"

###### NEW SUBCATEGORY BANK ############
>>>>>>> 1021a79f622ea149e9defbbd189d4c10472457e6
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

<<<<<<< HEAD
################ GET BANK ##################
=======
###### GET BANK ##############
>>>>>>> 1021a79f622ea149e9defbbd189d4c10472457e6
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
<<<<<<< HEAD
    app.run(debug=True, port=5000)
=======
    app.run(debug=True, port=8080)
>>>>>>> 1021a79f622ea149e9defbbd189d4c10472457e6
