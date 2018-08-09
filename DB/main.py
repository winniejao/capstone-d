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
    responseCode = req.alter_form(category, subcategory, formid, getRequest)
    if responseCode == 1:
        return "Success", 201
    else:
        return "Form ID not found", 404


################ NEW SUBCATEGORY BANK ############
@app.route('/landscape/sub/<string:subcat>', methods=['POST'])
def rLandscapeSub(subcat):
    rtrn_hndl = req.new_subcat("landscape", subcat)
    if rtrn_hndl == 1:
        return "Added", 201
    else:
        return "Table already exists", 400

@app.route('/equipment/sub/<string:subcat>', methods=['POST'])
def rEquipmentSub(subcat):
    rtrn_hndl = req.new_subcat("equipment", subcat)
    if rtrn_hndl == 1:
        return "Added", 201
    else:
        return "Table already exists", 400

@app.route('/tools/sub/<string:subcat>', methods=['POST'])
def rToolSub(subcat):
    rtrn_hndl = req.new_subcat("tools", subcat)
    if rtrn_hndl == 1:
        return "Added", 201
    else:
        return "Table already exists", 400

################ DELETE SUBCAT BANK ######################
@app.route('/deletesubcat/<string:category>/<string:subcat>', methods=['DELETE'])
def rDeleteSub(category, subcat):
    try:
        req.del_subcat(category, subcat)
        return 'Added', 201
    except:
        return "Form ID Not Found", 404

################ GET SUBCAT FILTER BANK ##################
@app.route('/landscape/<string:subcat>', methods=['GET'])
def rLandscapeGet(subcat):
    reqHandle = req.get_filter("landscape", subcat)
    return jsonify(reqHandle)


@app.route('/equipment/<string:subcat>', methods=['GET'])
def rEquipmentGet(subcat):
    reqHandle = req.get_filter("equipment", subcat)
    return jsonify(reqHandle)


@app.route('/tools/<string:subcat>', methods=['GET'])
def rToolsGet(subcat):
    reqHandle = req.get_filter("tools", subcat)
    return jsonify(reqHandle)


################## GET SUBCAT LIST BANK #######################
@app.route('/subcatlist/<string:category>', methods=['GET'])
def rSubcatGet(category):
    reqHandle = req.get_subcat(category)
    if reqHandle == -1:
        return "Invalid Category Name", 404
    else:
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
