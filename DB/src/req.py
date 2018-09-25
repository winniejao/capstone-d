import sqlite3
import datetime
import shutil
import os
import ntpath
from os import path
from collections import Counter

test_data = {
    "name": "State POS Computer",
    "item": "Card Reader",
    "purpose": "Handles credit card payments",
    "cost": "299.99",
    "serial": "12867-9992837-2323683264823",
    "date": "2018-08-25",
    "maint_date": "2018-12-25",
    "repeat": "6",
    "attach": ["E:/Test1234.txt", "E:/file1.txt", "E:/Gee.txt", "E:/Oh.docx"],
    "notes": "No chip reader functionality just yet",
    "completed": "1"
}

status_code = [200, 201, 404]


######################################################
# Method Name: get_all_tables
# Arguments (1): Category Name (Database),
# Returns: list of all tables in database
# Description: Gets all of the tables in a single DB
######################################################
def get_all_tables(database):
    conn = sqlite3.connect(database)
    c = conn.cursor()
    c.execute("SELECT name FROM sqlite_master WHERE type = \"table\" AND name != \"sqlite_sequence\"")
    table_list = c.fetchall()
    c.close()
    return table_list

######################################################
# Method Name: check_existence
# Arguments (3): Form ID,  Category Name (Database),
#                Subcategory Name (Table)
# Returns:  Query if the row exists
# Description:
######################################################
def check_form_existence(category, subcat, form_id):
    database = "..\\databases\\" + category + ".db"
    conn = sqlite3.connect(database)
    c = conn.cursor()
    c.execute("SELECT * FROM {} WHERE form_id = ?".format(subcat), (form_id,))
    return_query = c.fetchone()
    c.close()
    return return_query


######################################################
# Method Name: get_all_attachment
# Arguments (2): Category Name (Database),
#                Subcategory Name (Table)
# Returns: list
# Description: Returns a query list of all paths that are in the specified table
######################################################
def get_all_attachment(database, table):
    conn = sqlite3.connect(database)
    c = conn.cursor()
    c.execute("SELECT attach_path from {}".format(table))
    query = c.fetchall()
    c.close()
    query = [x[0].split("_",1)[1] for x in query]
    return query if query else ""

######################################################
# Method Name: get_path_list
# Arguments (2): Category Name (Database),
#                Subcategory Name (Table)
# Returns: list
# Description: Copies a file from a given filepath to
#              the attachments directory in the project
#              folder.
######################################################
def get_path_list(formInfo, form_id, new_path_list):
    attachment_list = formInfo["attach"]
    path_to_directory = "..\\attachments\\"
    for path_to_copy in attachment_list:
        relative_path = path_to_copy.split("/")
        relative_path[-1] = str(form_id) + "_" + relative_path[-1]
        new_path_list.append(relative_path[-1])
        try:
            shutil.copy(path_to_copy, path_to_directory + relative_path[-1])
        except FileNotFoundError:
            pass

    return new_path_list

######################################################
# Method Name: flpth_return
# Arguments (1): attch_lst (List to work with)
# Returns: Python list
# Description: Returns a relative project filepath
#              for a attachment file stored in the DB
######################################################
def flpth_return(attch_lst):
    new_lst = []
    for item in attch_lst:
       splt_lst = item.split("_")
       splt_lst = splt_lst[-1]
       new_lst.append(splt_lst)

    return new_lst

######################################################
# Method Name: delete_attachments
# Arguments (3): Category (DB), attch_tbl(Name of table)
#                dict (Dictionary containing the
#                attachments
# Returns: Null
# Description: Checks if a file attachment was removed
#              in an alter_form call, if so, removes it
#              from the attach table.
######################################################
def delete_attachment(category, attch_tbl, dict):
    # item in dict does not exist in DB
    # remove item from DB
    conn = sqlite3.connect("..\\databases\\" + category + ".db")
    c = conn.cursor()
    c.execute("SELECT attach_path FROM {}".format(attch_tbl))
    lst_temp = list(c.fetchall())
    lst_to_fltr = [i[0] for i in lst_temp]
    deletion_lst = list(set(lst_to_fltr).difference(dict['attach']))
    for path in deletion_lst:
        c.execute("DELETE FROM {} WHERE attach_path=?".format(attch_tbl), (path,))
        conn.commit()

######################################################
# Method Name: add_form
# Arguments (3): Form ID,  Category Name (Database),
#                Subcategory Name (Table)
# Returns: form id
# Description: function that adds the form to a SQL database
######################################################
def add_form(category, subcat, formInfo):
    category = category.lower()
    subcat = subcat.replace(" ", "_").lower()

    # writes the subcat to a file -- used for quick-access
    write_quick_access(category, subcat)

    dict_to_return = {}

    # generate unique form_ids
    form_id = datetime.datetime.now()
    form_id = str(form_id).replace("-", "").replace(" ", "").replace(":", "").split(".", 1)[0]
    success_flag = False

    # convert date into a date object
    date_storage = []
    date_storage.append(formInfo["date"].split("-"))
    date = datetime.date(int(date_storage[0][0]), int(date_storage[0][1]), int(date_storage[0][2]))
    date_storage.clear()

    # get the database name ready
    attachment = subcat + "_" + form_id + "_attch"
    database = "..\\databases\\" + category + ".db"
    # table_list = get_all_tables(database)

    # if subcat not in table_list:
    # new_subcat(category, subcat)

    # save the file to an attachment folder (in-case the file is deleted later)
    #os.unlink(".\\attachments\\" + "file2.txt")
    #os.unlink(".\\assets\\" + "equipment.txt")
    #os.unlink(".\\attachments\\" + "test.txt")
    #os.unlink(".\\attachments\\" + "test1234.txt")
    new_path_list = []
    if formInfo["attach"]:
        formInfo["attach"] = get_path_list(formInfo, form_id, new_path_list)


    attach_table(category, subcat, form_id, formInfo)
    if check_form_existence(category, subcat, form_id) is None:
        conn = sqlite3.connect(database)
        c = conn.cursor()
        c.execute(
            "INSERT INTO {}(form_id, name, item, purpose, cost, serial, date, maint_date, repeat, attach, "
            "notes, category, subcat, completed) VALUES(?,?,?,?,?,?,?,?,?, "
            "?,?,?,?,?)".format(subcat),
            (form_id,
             formInfo["name"],
             formInfo["item"],
             formInfo["purpose"],
             formInfo["cost"],
             formInfo["serial"],
             date,
             formInfo["maint_date"],
             formInfo["repeat"],
             attachment,
             formInfo["notes"],
             category,
             subcat,
             0))
        conn.commit()
        conn.close()
        success_flag = True
        dict_to_return["form_id"] = form_id

    return dict_to_return, status_code[1] if success_flag else status_code[2]


######################################################
# Method Name: get_form
# Arguments (3): Form ID,  Category Name (Database),
#                Subcategory Name (Table)
# Returns: form list by id, or all forms
# Description: Returns all forms if no form id given, else returns specific form
######################################################
def get_form(category, subcat, formid):
    category = category.lower()
    subcat = subcat.replace(" ", "_").lower()
    database = "..\\databases\\" + category + ".db"
    conn = sqlite3.connect(database)
    c = conn.cursor()
    final_query_list = []

    #get the field names to map to key,value to json
    query_row = ("SELECT * FROM {}").format(subcat)
    conn = sqlite3.connect("..\\databases\\" + category + ".db")
    d = conn.cursor()
    d.execute(query_row)
    conn.commit()
    rs = list(d.fetchall())
    field_names = [r[0] for r in d.description]
    if formid is None:
        c.execute("SELECT * FROM {}".format(subcat))
        all_rows = c.fetchall()
        table_list = get_all_tables(database)
        table_list = [x[0] for x in table_list]
        for row in all_rows:
            row_list = []
            for item in row:
                row_list.append(item)
            if row_list[9] in table_list:
                row_list[9] = get_all_attachment(database, row_list[9])
            final_query_list.append(dict(zip(field_names, row_list)))
    else:
        attach_table = subcat + '_' + str(formid) + '_attch'
        c.execute("SELECT * FROM {} WHERE form_id=?".format(subcat), (formid,))
        query = c.fetchone()
        table_list = get_all_tables(database)
        table_list = [x[0] for x in table_list]

        for item in query:
            final_query_list.append(item)
        if attach_table in table_list:
            final_query_list[9] = get_all_attachment(database, attach_table)
        final_query_list = dict(zip(field_names, final_query_list))

    c.close()
    return final_query_list, status_code[0] if final_query_list is not None else status_code[2]


######################################################
# Method Name: del_form
# Arguments (3): Form ID,  Category Name (Database),
#                Subcategory Name (Table)
# Returns: returns status code
# Description: Deletes a form from the database along with it's attachment table
######################################################
def del_form(category, subcat, formid):
    success_flag = False

    category = category.lower()
    subcat = subcat.replace(" ", "_").lower()
    attch_tbl = subcat + "_" + str(formid) + "_attch"

    if check_form_existence(category, subcat, formid) is not None:
        database = "..\\databases\\" + category + ".db"
        conn = sqlite3.connect(database)
        c = conn.cursor()

        table_list = get_all_tables(database)
        table_list = [x[0] for x in table_list]
        if attch_tbl in table_list:
            c.execute("DROP TABLE {}".format(attch_tbl))  # Deletes the attachment table first
            conn.commit()
        c.execute("DELETE FROM {} WHERE form_id=?".format(subcat), (formid,))
        conn.commit()
        success_flag = True
        c.close()
    return status_code[0] if success_flag else status_code[2]


######################################################
# Method Name: get_events
# Arguments (2): Start Date, End Date,
#                Subcategory Name (Table)
# Returns: Python dictionary
# Description: Gives specific form information within a given date range from all Categories
######################################################
def get_events(start_date, end_date):
    response_dict = {"Equipment": [], "Landscape": [], "Tools": []}
    success_flag = False

    event_list = []
    date_list = []
    date_list.append(start_date.split("-"))
    start = datetime.date(int(date_list[0][0]), int(date_list[0][1]), int(date_list[0][2]))
    date_list.clear()
    date_list.append(end_date.split("-"))
    end = datetime.date(int(date_list[0][0]), int(date_list[0][1]), int(date_list[0][2]))
    date_list.clear()

    all_databases = ["Equipment.db", "Landscape.db", "Tools.db"]

    #get all fields necessary from one database
    field_names = ["form_id", "name", "item", "date", "notes", "category", "subcat"]

    for database in all_databases:
        formatted_database = "..\\databases\\" + database
        list_of_tables = get_all_tables(formatted_database)
        list_of_tables = [x[0] for x in list_of_tables]
        conn = sqlite3.connect(formatted_database)
        c = conn.cursor()
        for table in list_of_tables:
            if "_attch" not in table:
                c.execute("SELECT * FROM {}".format(table))
                all_rows = c.fetchall()
                for row in all_rows:
                    saver = []
                    if row[7] and str(start) <= row[7] <= str(end):
                        saver.append(row[0])
                        saver.append(row[1])
                        saver.append(row[2])
                        saver.append(row[7])
                        saver.append(row[10])
                        saver.append(row[11])
                        saver.append(row[12])
                    if saver:
                        response_dict[database.strip(".db")].append(dict(zip(field_names,saver)))
                        success_flag = True

        event_list.clear()
        c.close()

    return response_dict, status_code[0] if success_flag else status_code[2]


######################################################
# Method Name: get_preventative_maint
# Arguments (2): Category Name (Database),
#                Subcategory Name (Table)
# Returns: Python List
# Description: Gets form name, maint_date, and repeat of forms within a subcategory
######################################################
def get_preventative_maint(category, subcat):
    category = category.lower()
    subcat = subcat.replace(" ", "_").lower()

    field_names = ['form_id', 'name', 'maint_date', 'repeat']
    final_data = []
    database = "..\\databases\\" + category + ".db"
    table_list = get_all_tables(database)
    table_list = [x[0] for x in table_list]
    success_flag = False
    prev_maint_forms = None
    if subcat in table_list:
        conn = sqlite3.connect(database)
        c = conn.cursor()
        query = "SELECT form_id, name, maint_date, repeat FROM {} WHERE maint_date <> \"\"".format(subcat)
        c.execute(query)
        prev_maint_forms = c.fetchall()
        prev_maint_forms = [list(x) for x in prev_maint_forms]
        for item in prev_maint_forms:
            final_data.append(dict(zip(field_names, item)))
        success_flag = True

    return final_data, status_code[0] if success_flag else status_code[2]


######################################################
# Method Name: write_quick_access
# Arguments (2): Category Name (Database),
#                Subcategory Name (Table)
# Returns: Nothing
# Description: File that writes subcat to a file to later get 4 subcats
######################################################
def write_quick_access(category, subcat):
    add_to_file = category + ".txt"
    path_to_add = "..\\assets\\"
    file_list = os.listdir(path_to_add)
    if add_to_file in file_list:
        with open(os.path.join(path_to_add, add_to_file), "a") as file:
            file.write('\n' + subcat)

        file.close()
    else:
        with open(os.path.join(path_to_add, add_to_file), "w") as file:
            file.write(subcat)

        file.close()


    #os.unlink(path_to_add + add_to_file)

######################################################
# Method Name: read_quick_access
# Arguments (1): Category (Database)
# Returns: a list
# Description: returns list of 4 most commonly occurring subcategories
######################################################
def read_quick_access(category):
    success_flag = False
    category = category.lower()
    filename = category + ".txt"
    path = "..\\assets\\"
    filelist = os.listdir(path)
    mostcommon = None
    if filename in filelist:
        with open(os.path.join(path, filename), "r") as file:
            subcat_list = file.read().split('\n')
            success_flag = True
            count = Counter(subcat_list)
            mostcommon = count.most_common(4)

    return [x[0] for x in mostcommon], status_code[0] if success_flag else status_code[2]


######################################################
# Method Name: delete_from_quick_access
# Arguments (1): Category (Database), Subcategory(table)
# Returns: nothing
# Description: deletes subcategory from quick access and overwrites file
######################################################
def delete_from_quick_access(category, subcat):
    path = "..\\assets\\"
    filename = category + ".txt"
    filelist = os.listdir(path)
    if filename in filelist:
        with open(os.path.join(path, filename), "r") as file:
            subcat_list = file.read().split('\n')
            subcat_list = [x for x in subcat_list if x != subcat]
            with open(os.path.join(path, filename), "w") as over_write_file:
                for item in range(len(subcat_list) - 1):
                    over_write_file.write(subcat_list[item] + '\n')
                over_write_file.write(subcat_list[-1])


######################################################
# Method Name: open_file
# Arguments (4): Category (Database), Subcategory(table), formid, filename
# Returns: httpstatus code
# Description: opens specific file
######################################################
def open_file(category, subcat, formid, filename):
    success_flag = False
    category = category.lower()
    subcat = subcat.replace(" ", "_").lower()
    filename = str(formid) + "_" + filename
    database = "..\\databases\\" + category + ".db"
    result = None
    conn = sqlite3.connect(database)
    c = conn.cursor()
    table_to_search = subcat + '_' + str(formid) + '_attch'
    table_list = get_all_tables(database)
    table_list = [x[0] for x in table_list]
    if table_to_search in table_list:
        c.execute("SELECT * FROM {}".format(table_to_search))
        result = c.fetchall()
    c.close()

    if result:
        result = [x[1] for x in result]
        list_dir = os.listdir("..\\attachments\\")
        for file in result:
            if file == filename and file in list_dir:
                success_flag = True
                os.startfile("..\\attachments\\" + filename)

    return status_code[0] if success_flag else status_code[2]


######################################################
# Method Name: alter_form
# Arguments (4): JSON Dictionary, Form ID,
#                Category Name (Database),
#                Subcategory Name (Table)
# Returns: 1 (Successful alter), 0 (Failure to alter)
# Description: Alters the given form from database
#              Category, table Subcat, and Form ID
#              formid, with the given fields in the
#              Dictionary dictself.
######################################################
def alter_form(category, subcat, formid, dict):
    category = category.lower()
    subcat = subcat.replace(" ", "_").lower()
    attch_tbl = subcat + '_' + str(formid) + '_attch'

    update_query = "UPDATE {} SET name = ?, item = ?,\
	 		        purpose = ?, cost = ?, serial = ?,\
			        date = ?, maint_date = ?, repeat =?,\
                    notes = ?, category =?, subcat = ?,\
			        completed = ? WHERE form_id = ?".format(subcat)

    validate_query = "SELECT form_id FROM {} \
                      WHERE form_id = {}".format(subcat, formid)

    conn = sqlite3.connect("..\\databases\\" + category + '.db')
    c = conn.cursor()
    c.execute(validate_query)
    validate_return = c.fetchone()

    if validate_return is None:
        return 0
    else:
        c.execute(update_query, (dict['name'], dict['item'],
                                 dict['purpose'], dict['cost'],
                                 dict['serial'], dict['date'],
                                 dict['maint_date'], dict['repeat'],
                                 dict['notes'], category, subcat, dict['completed'], formid))
        conn.commit()
        conn.close()
        new_path_list = []
        if dict["attach"]:
            dict["attach"] = get_path_list(dict, formid, new_path_list)
        try:
            attach_table(category, subcat, formid, dict)  # Adds the new attachments
            delete_attachment(category, attch_tbl, dict)
        except FileNotFoundError:
            print("File not found")
        return 1

######################################################
# Method Name: new_subcat
# Arguments (2): Category Name (Database),
#                Subcategory Name (Table)
# Returns: None
# Description: Creates a new subcategory (table) in the
#              Database.
######################################################
def new_subcat(category, subcat):
    category = category.lower()
    subcat = subcat.replace(" ", "_").lower()
    query = "CREATE TABLE IF NOT EXISTS {} (\
	         form_id INTEGER PRIMARY KEY,\
			 name TEXT, item TEXT, purpose TEXT, cost REAL,\
	         serial TEXT, date DATE, maint_date DATE,\
             repeat INTEGER, attach TEXT,\
			 notes TEXT, category TEXT, subcat TEXT, completed INTEGER)".format(subcat)
    query_exists = "SELECT count(*) FROM sqlite_master WHERE type='table' AND name= ?"

    conn = sqlite3.connect("..\\databases\\" + category + '.db')
    c = conn.cursor()
    c.execute(query_exists, (subcat,))
    exists = c.fetchall()
    if exists == [(0,)]:
        c.execute(query)
        conn.commit()
        conn.close()
        return 1
    else:
        conn.commit()
        conn.close()
        return 0


######################################################
# Method Name: del_subcat
# Arguments (2): Category Name (Database),
#                Subcategory Name (Table)
# Returns: None
# Description: Deletes a subcategory (table) from the
#              given database (Category)
######################################################
def del_subcat(category, subcat):
    category = category.lower()
    subcat = subcat.replace(" ", "_").lower()

    # delete from quick access
    delete_from_quick_access(category, subcat)

    query = "DROP TABLE IF EXISTS {}".format(subcat)
    query_tbl = ("SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence'")
    query_cleanup = "SELECT {} FROM {}".format((formid,),(subcat))
    conn = sqlite3.connect("..\\databases\\" + category + ".db")
    c = conn.cursor()
    c.execute(query_tbl)
    lst_temp = list(c.fetchall())
    lst_to_fltr = [i[0] for i in lst_temp]  # Converts from tuple to list#
    for subcats in lst_to_fltr:
        if subcats.startswith(subcat + '_') and subcats.endswith('_attch'):
            c.execute("DROP TABLE {}".format(subcats))  # Drops all the attach tables first
            conn.commit()

    c.execute(query)  # Drops the subcat table
    conn.commit()
    conn.close()



######################################################
# Method Name: get_table_data
# Arguments (2): Category Name (Database),
#                Subcategory Name (Table)
# Returns: Python dictionary
# Description: Returns every row in a subcategory (table)
#              and appends those rows to a Python Dictionary
######################################################
def get_table_data(category, subcat):
    category = category.lower()
    subcat = subcat.replace(" ", "_").lower()
    query_row = ("SELECT * FROM {}").format(subcat)

    conn = sqlite3.connect("..\\databases\\" + category + ".db")
    c = conn.cursor()
    c.execute(query_row)
    conn.commit()
    rs = list(c.fetchall())
    field_names = [r[0] for r in c.description]  # Gets the table schema#
    json_data = []
    for results in rs:
        json_data.append(dict(zip(field_names, results)))

    for item in json_data:
        frm_id = item['form_id']
        attch_tbl = subcat + '_' + str(frm_id) + '_attch'
        query_create = "CREATE TABLE IF NOT EXISTS {} (\
                		attach_id TEXT,\
                		attach_path TEXT UNIQUE,\
                		FOREIGN KEY (attach_id) REFERENCES\
                		{}(attach) ON DELETE CASCADE)".format(attch_tbl, subcat)

        query_attch = ("SELECT attach_path FROM {}").format(attch_tbl)

        c.execute(query_create)
        c.execute(query_attch)  # gets attachments from attachment table#
        attch_lst = list(c.fetchall())
        lst_to_fltr = [i[0] for i in attch_lst]  # Converts tuple to list#
        item.update({'attach': flpth_return(lst_to_fltr)})

    conn.close()
    return json_data

######################################################
# Method Name: get_subcat
# Arguments (1): Database to open (Category)
# Returns: Python list
# Description: Gets the list of tables in the database
#              Which represents the list of subcategories
######################################################
def get_subcat(category):
    query = ("SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence'")
    category = category.lower()
    if category == 'tools' or category == 'landscape' or category == 'equipment':
        conn = sqlite3.connect("..\\databases\\" + category + ".db")
        c = conn.cursor()
        c.execute(query)
        lst_temp = list(c.fetchall())
        conn.close()
        lst_to_fltr = [i[0] for i in lst_temp]  # Converts from tuple to list#
        lst_fltrd = list(
            filter(lambda n: not n.endswith('_attch'), lst_to_fltr))  # removes attachment tables from list#
        lst_fltrd = [x.replace("_", " ").title() for x in
                     lst_fltrd]  # Replaces "_" with spaces and capitalizes the first letter in a word

        return lst_fltrd
    else:
        return -1


######################################################
# Method Name: attach_table
# Arguments (4): JSON Dictionary, Form ID,
#                Category Name (Database),
#                Subcategory Name (Table)
# Returns: None
# Description: Creates an attachment table for a given
#              row in a table. Has a foreign key from
#              the table it references and holds the
#              values of the filepaths of attachments
######################################################
def attach_table(category, subcat, formid, dict):
    attch_tbl = subcat + '_' + str(formid) + '_attch'
    query_nsrt = "INSERT OR REPLACE INTO {} \
                  (attach_id, attach_path) \
                  VALUES(?, ?)".format(attch_tbl)
    query_create = "CREATE TABLE IF NOT EXISTS {} (\
					attach_id TEXT,\
					attach_path TEXT UNIQUE,\
					FOREIGN KEY (attach_id) REFERENCES\
					 {}(attach) ON DELETE CASCADE)".format(attch_tbl, subcat)

    conn = sqlite3.connect("..\\databases\\" + category + '.db')
    c = conn.cursor()
    c.execute(query_create)
    conn.commit()

    for item in dict['attach']:  # Inserts all items in the attach sublist into separate rows#
        c.execute(query_nsrt, (attch_tbl, item))

    conn.commit()
    conn.close()


######################################################
# Method Name: backup_db
# Arguments (1): String filepath (flpth)
# Returns: None
# Description: Copies a .db file in the project directory
#              and pastes it in the given filepath as a
#              .db.bak file. Also copies over file per-
#              missions
######################################################
def backup_db(flpth):
    filepath = flpth["path"]
    print(filepath)
    for filename in os.listdir("..\\databases\\"):
        if filename.endswith(".db"):
            head, tail = path.split(filename)
            dst = filepath + tail + ".bak"  # Adds a .bak to the filepath#
            shutil.copy("..\\databases\\" + filename, dst)
            shutil.copystat("..\\databases\\" + filename, dst)  # Copies file permissions#


######################################################
# Method Name: restore_backup
# Arguments (1): String filepath (flpth)
# Returns: None
# Description: Copies a .db.bak file from the given
#              filepath, strips the .bak and pastes
#              it over the database files in the project
#              directory
######################################################
def restore_backup(flpth):
    filepath = flpth["path"]
    for filename in os.listdir(filepath):
        if filename.endswith(".db.bak"):
            src = os.path.join(filepath, filename)
            dst_src = src[:-4]  # Removes .bak from filename on path #
            shutil.copy(src, "..\\databases\\" + ntpath.basename(dst_src))
            shutil.copystat(src, "..\\databases\\" + ntpath.basename(dst_src))  # Copies file permissions#

######################################################
# Method Name: search
# Arguments (1): String to search on (search_str)
# Returns: Python Dictionary with fields that match
#           search_str
# Description: Finds the substring search_str in all
#              three databases, if found, writes the
#              entire row to a python dictionary and
#              returns to front end.
######################################################
def search(search_dict):
    search_str = search_dict["search"]
    databases = []
    json_str = []
    for filename in os.listdir("..\\databases\\"):  # Gets the database names
        if filename.endswith(".db"):
            databases.append(filename)

    for database in databases:  # Connects to all three of the DBs one at a time
        conn = sqlite3.connect("..\\databases\\" + database)
        c = conn.cursor()
        for tablerow in c.execute(
                "SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence'").fetchall():
            table = tablerow[0]  # Loops through each table
            if '_attch' not in table:  # Filters the attachment tables
                c.execute("SELECT * FROM {}".format(table))
                field_names = [r[0] for r in c.description]  # gets the table schema
                for row in c:  # Goes through every row
                    row_srch = list(map(str, row))
                    if any(search_str.lower() in s.lower() for s in row_srch):  # If match was found in the row
                        json_str.append(dict(zip(field_names, row)))  # writes the entire row to a dictionary
            else:
                continue
        conn.close()
    return json_str

# if __name__ == '__main__':
    # print(new_subcat("landscape", "trail"))
    # print(add_form("Equipment", "Computers", test_data))
    # print(get_form("equipment", "Computers", 20180924174146))
    # print(alter_form("equipment", "Computers", 20180924163912, test_data))
    # attach_table("equipment", "Computer", 2, test_data)
    # print(get_subcat("equipment"))
    # print(get_table_data("equipment", "computers"))
# get_all_tables("equipment.db")
# backup_db({"path": "C:\\Users\\Ben3\\Desktop\\"})
# restore_backup({ "path": "C:\\Users\\Ben3\\Desktop\\"})
#     print(search({'search': 'Laptop'}))
#     del_subcat("Landscape", "Trail")
    # print(flpth_return(test_lst['attach']))
