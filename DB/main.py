import Form
import json
import req
from flask import Flask, request, jsonify

app = Flask(__name__)

################ FORM BANK ##################

@app.route('/equipment/form/', methods=['POST'])
def rAddForm():
    getRequest = json.loads(request.data)
    reqHandle = req.add_form(getRequest)
    return jsonify(reqHandle)

@app.route('/equipment/form/<int:formid>', methods=['GET'])
def rGetForm(formid):
    getRequest = json.loads(request.data)
    reqHandle = req.get_form(getRequest, formid)
    return jsonify(reqHandle)

@app.route('/equipment/form/<int:formid>', methods=['DELETE'])
def rDeleteForm(formid):
    getRequest = json.loads(request.data)
    reqHandle = req.del_form(getRequest, formid)
    return jsonify(reqHandle)

@app.route('/equipment/form/<int:formid>', methods=['PUT'])
def rAlterForm(formid):
    getRequest = json.loads(request.data)
    reqHandle = req.alter_form(getRequest, formid)
    return jsonify(reqHandle)

################ NEW SUBCATEGORY BANK ############
@app.route('/landscape/sub/<string:subcat>', methods=['POST'])
def rLandscapeSub(subcat):
    getRequest = json.loads(request.data)
    reqHandle = req.new_subcat(getRequest, subcat)
    return jsonify(reqHandle)

@app.route('/equipment/sub/<string:subcat>', methods=['POST'])
def rEquipmentSub(subcat):
    getRequest = json.loads(request.data)
    reqHandle = req.new_subcat(getRequest, subcat)
    return jsonify(reqHandle)

@app.route('/tools/sub/<string:subcat>', methods=['POST'])
def rToolSub(subcat):
    getRequest = json.loads(request.data)
    reqHandle = req.new_subcat(getRequest, subcat)
    return jsonify(reqHandle)

################ GET SUBCAT ITEMS BANK ##################
@app.route('/landscape/<string:subcat>', methods=['GET'])
def rLandscapeGet(subcat):
    getRequest = json.loads(request.data)
    reqHandle = req.new_subcat(getRequest, subcat)
    return jsonify(reqHandle)

@app.route('/equipment/<string:subcat>', methods=['GET'])
def rEquipmentGet(subcat):
    getRequest = json.loads(request.data)
    reqHandle = req.new_subcat(getRequest, subcat)
    return jsonify(reqHandle)

@app.route('/tools/<string:subcat>', methods=['GET'])
def rToolsGet(subcat):
    getRequest = json.loads(request.data)
    reqHandle = req.new_subcat(getRequest, subcat)
    return jsonify(reqHandle)

################## GET SUBCAT BANK #######################
@app.route('/subcatlist/<string:category>', methods=['GET'])
def rSubcatGet(category):
    reqHandle = req.get_subcat(category)
    return jsonify(reqHandle)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
