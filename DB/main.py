import json
import req
from flask import Flask, request, jsonify

app = Flask(__name__)

################ FORM BANK ##################

@app.route('/form/<string:category>', methods=['POST'])
def rAddForm():
    getRequest = json.loads(request.data)
    reqHandle = req.add_form(getRequest)
    return jsonify(reqHandle)

@app.route('/form/<int:formid>', methods=['GET'])
def rGetForm(formid):
    getRequest = json.loads(request.data)
    reqHandle = req.get_form(getRequest, formid)
    return jsonify(reqHandle)

@app.route('/form/<int:formid>', methods=['DELETE'])
def rDeleteForm(formid):
    getRequest = json.loads(request.data)
    reqHandle = req.del_form(getRequest, formid)
    return jsonify(reqHandle)

@app.route('/form/<int:formid>/<string:category>/<string:subcategory>', methods=['PUT'])
def rAlterForm(formid, category, subcategory):
    getRequest = json.loads(request.data)
    responseCode = req.alter_form(getRequest, formid, category, subcategory)
    if responseCode == 1:
        return "Success", 201
    else:
        return "Form ID not found", 400

################ NEW SUBCATEGORY BANK ############
@app.route('/landscape/sub/<string:subcat>', methods=['POST'])
def rLandscapeSub(subcat):
    try:
        req.new_subcat("Landscape", subcat)
        return 'Added', 201
    except:
        return "Error", 404

@app.route('/equipment/sub/<string:subcat>', methods=['POST'])
def rEquipmentSub(subcat):
    try:
        req.new_subcat("Equipment", subcat)
        return 'Added', 201
    except:
        return "Error", 404

@app.route('/tools/sub/<string:subcat>', methods=['POST'])
def rToolSub(subcat):
    try:
        req.new_subcat("Tools", subcat)
        return 'Added', 201
    except:
        return "Error", 404

################ GET SUBCAT FILTER BANK ##################
@app.route('/landscape/<string:subcat>', methods=['GET'])
def rLandscapeGet(subcat):
    reqHandle = req.get_filter("Landscape", subcat)
    return jsonify(reqHandle)

@app.route('/equipment/<string:subcat>', methods=['GET'])
def rEquipmentGet(subcat):
    reqHandle = req.get_filter("Equipment", subcat)
    return jsonify(reqHandle)

@app.route('/tools/<string:subcat>', methods=['GET'])
def rToolsGet(subcat):
    reqHandle = req.get_filter("Tools", subcat)
    return jsonify(reqHandle)

################## GET SUBCAT LIST BANK #######################
@app.route('/subcatlist/<string:category>', methods=['GET'])
def rSubcatGet(category):
    reqHandle = req.get_subcat(category)
    return jsonify(reqHandle)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
