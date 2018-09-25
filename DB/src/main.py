from flask import Flask, request, jsonify
from flask_restful import Api, Resource
import json
import req

app = Flask(__name__)
################################## FORM BANK ######################################

@app.route('/form/<string:category>/<string:subcat>', methods=['POST'])
def rAddForm(category, subcat):
    try:
        getRequest = request.json
        reqHandle = req.add_form(category, subcat, getRequest)
        return jsonify(reqHandle)

    except:
        return jsonify(req.status_code[2])


@app.route('/form/<string:category>/<string:subcat>/', defaults={'formid': None}, methods=['GET'])
@app.route('/form/<string:category>/<string:subcat>/<int:formid>', methods=['GET'])
def rGetForm(category, subcat, formid):
    try:
        reqHandle = req.get_form(category, subcat, formid)
        return jsonify(reqHandle)

    except:
        return jsonify(req.status_code[2])


@app.route('/form/<string:category>/<string:subcat>/<int:formid>', methods=['DELETE'])
def rDeleteForm(category, subcat, formid):
    try:
        reqHandle = req.del_form(category, subcat, formid)
        return jsonify(reqHandle)

    except:
        return jsonify(req.status_code[2])


@app.route("/getevents/<string:start_date>/<string:end_date>", methods=['GET'])
def rGetEvents(start_date, end_date):
    try:
        reqHandle = req.get_events(start_date, end_date)
        return jsonify(reqHandle)

    except:
        return jsonify(req.status_code[2])


@app.route("/preventative_maint/<string:category>/<string:subcat>", methods=['GET'])
def rGetPreventativeMaint(category, subcat):
    try:
        reqHandle = req.get_preventative_maint(category, subcat)
        return jsonify(reqHandle)

    except:
        return jsonify(req.status_code[2])


@app.route("/quickaccess/<string:category>", methods=['GET'])
def rQuickAccess(category):
    try:
        reqHandle = req.read_quick_access(category)
        return jsonify(reqHandle)

    except:
        return jsonify(req.status_code[2])


@app.route("/openfile/<string:category>/<string:subcat>/<int:formid>/<string:filename>", methods=['GET'])
def rOpenFile(category, subcat, formid, filename):
    try:
        reqHandle = req.open_file(category, subcat, formid, filename)
        return jsonify(reqHandle)

    except:
        return jsonify(req.status_code[2])


@app.route('/form/<string:category>/<string:subcategory>/<int:formid>', methods=['PUT'])
def rAlterForm(category, subcategory, formid):
    getRequest = json.loads(request.data)
    responseCode = req.alter_form(category, subcategory, formid, getRequest)
    if responseCode == 1:
        return "Successfully Altered", 201
    else:
        return "Form ID not found", 404


######################## NEW SUBCATEGORY BANK #########################
@app.route('/landscape/sub/<string:subcat>', methods=['POST'])
def rLandscapeSub(subcat):
    rtrn_hndl = req.new_subcat("landscape", subcat)
    if rtrn_hndl == 1:
        return "Subcategory Added", 201
    else:
        return "Table already exists", 400


@app.route('/equipment/sub/<string:subcat>', methods=['POST'])
def rEquipmentSub(subcat):
    rtrn_hndl = req.new_subcat("equipment", subcat)
    if rtrn_hndl == 1:
        return "Subcategory Added", 201
    else:
        return "Table already exists", 400


@app.route('/tools/sub/<string:subcat>', methods=['POST'])
def rToolSub(subcat):
    rtrn_hndl = req.new_subcat("tools", subcat)
    if rtrn_hndl == 1:
        return "Subcategory Added", 201
    else:
        return "Table already exists", 400


########################## DELETE SUBCAT BANK ###########################
@app.route('/deletesubcat/<string:category>/<string:subcat>', methods=['DELETE'])
def rDeleteSub(category, subcat):
    try:
        req.del_subcat(category, subcat)
        return 'Subcategory Successfully Deleted', 201
    except:
        return "Subcategory Not Found", 404


########################## GET SUBCAT FILTER BANK ########################
@app.route('/landscape/<string:subcat>', methods=['GET'])
def rLandscapeGet(subcat):
    reqHandle = req.get_table_data("landscape", subcat)
    return jsonify(reqHandle)


@app.route('/equipment/<string:subcat>', methods=['GET'])
def rEquipmentGet(subcat):
    reqHandle = req.get_table_data("equipment", subcat)
    return jsonify(reqHandle)


@app.route('/tools/<string:subcat>', methods=['GET'])
def rToolsGet(subcat):
    reqHandle = req.get_table_data("tools", subcat)
    return jsonify(reqHandle)


######################## GET SUBCAT LIST BANK #######################
@app.route('/subcatlist/<string:category>', methods=['GET'])
def rSubcatGet(category):
    reqHandle = req.get_subcat(category)
    if reqHandle == -1:
        return "Invalid Category Name", 404
    else:
        return jsonify(reqHandle)


########################### BACKUP / RESTORE DB ########################
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

# ################## SEARCH DB on STRING JSON ########################
@app.route('/search', methods=['POST'])
def rSearch():
    getRequest = json.loads(request.data)
    reqHandle = req.search(getRequest)
    return jsonify(reqHandle)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
