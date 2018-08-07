import json
import req
from flask import Flask, request, jsonify

app = Flask(__name__)


################ FORM BANK ##################

@app.route('/form/<string:category>/<string:subcat>', methods=['POST'])
def rAddForm(category, subcat):
    try:
        getRequest = request.json
        reqHandle = req.add_form(category, subcat, getRequest)
        return jsonify(reqHandle)

    except:
        return jsonify("404 - NOT FOUND")


@app.route('/form/<string:category>/<string:subcat>/<int:formid>', methods=['GET'])
def rGetForm(category, subcat, formid):
    try:
        reqHandle = req.get_form(category, subcat, formid)
        return jsonify(reqHandle)

    except:
        return jsonify("404 - NOT FOUND")


@app.route('/form/<string:category>/<string:subcat>/<int:formid>', methods=['DELETE'])
def rDeleteForm(category, subcat, formid):
    try:
        reqHandle = req.del_form(category, subcat, formid)
        return jsonify(reqHandle)

    except:
        return jsonify("404 - NOT FOUND")


@app.route('/form/<string:category>/<string:subcategory>/<int:formid>', methods=['PUT'])
def rAlterForm(category, subcategory, formid):
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

################ DELETE SUBCAT BANK ######################
@app.route('/deletesubcat/<string:category>/<string:subcat>', methods=['DELETE'])
def rDeleteSub(category, subcat):
    req.del_subcat(category, subcat)
    return 'Added', 201

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


################## BACKUP / RESTORE DB ########################
@app.route('/backup', methods=['POST'])
def rBackup():
    getRequest = json.loads(request.data)
    reqHandle = req.backup_db(getRequest)
    return ("Backup Successful ")

@app.route('/restore', methods=['POST'])
def rRestore():
    getRequest = json.loads(request.data)
    reqHandle = req.restore_backup(getRequest)
    return ("Restore Successful")

################## SEARCH DB on STRING ########################
@app.route('/search/<string:search_str>', methods=['GET'])
def rSearch(search_str):
    reqHandle = req.search(search_str)
    return jsonify(reqHandle)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
