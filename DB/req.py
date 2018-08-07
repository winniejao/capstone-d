import sqlite3
import json
import itertools
import datetime
import shutil
import os
import ntpath
from os import path

test_data = {
    "name": "Boiler1",
    "item": "Exhaust Pipe",
    "purpose": "To Burn ",
    "cost": "99.99 ",
    "serial": "122-937-2210 ",
    "date": "2018-06-18",
    "maint_date" : '2018-12-18',
    "repeat": "6",
    "attach": ["Q.jpg", "A.png", "s.png"],
    "notes": "All of these need to burn"
}

######################################################
# Method Name: get_all_tables
# Arguments (1): Category Name (Database),
# Returns:
# Description:
######################################################
def get_all_tables(database):
    conn = sqlite3.connect(database)
    c = conn.cursor()
    c.execute("SELECT name FROM sqlite_master WHERE type = \"table\"")
    table_list = c.fetchall()
    c.close()
    return table_list

######################################################
# Method Name: check_existence
# Arguments (3): Form ID,  Category Name (Database),
#                Subcategory Name (Table)
# Returns:
# Description:
######################################################
def check_existence(category, subcat, form_id):
    database = category + ".db"
    conn = sqlite3.connect(database)
    c = conn.cursor()
    c.execute("SELECT * FROM {} WHERE form_id = ?".format(subcat), (form_id,))
    return_query = c.fetchone()
    c.close()
    return return_query

######################################################
# Method Name: add_form
# Arguments (3): Form ID,  Category Name (Database),
#                Subcategory Name (Table)
# Returns:
# Description:
######################################################
def add_form(category, subcat, formInfo):
    form_id = datetime.datetime.now()
    form_id = str(form_id).replace("-", "").replace(" ", "").replace(":", "").split(".", 1)[0]

    attachment = subcat + "_" + form_id + "_attch"
    database = category + ".db"
    table_list = get_all_tables(database)

    if subcat not in table_list:
        new_subcat(category, subcat)

    if formInfo["attach"]:
        attach_table(category, subcat, form_id, formInfo)

    if check_existence(category, subcat, form_id) is None:
        conn = sqlite3.connect(database)
        c = conn.cursor()
        c.execute("INSERT INTO {}(form_id, name, item, purpose, cost, serial, date, maint_date, repeat, attach, notes) VALUES(?,?,?,?,?,?,?,?,?,"
              "?,?)".format(subcat),
              (form_id,
               formInfo["name"],
               formInfo["item"],
               formInfo["purpose"],
               formInfo["cost"],
               formInfo["serial"],
               formInfo["date"],
               formInfo["maint_date"],
               formInfo["repeat"],
               attachment,
               formInfo["notes"]))
        conn.commit()
        conn.close()
        return form_id + ", 201 - CREATED"
    else:
        return "405 - NOT FOUND"

    # return data

######################################################
# Method Name: get_form
# Arguments (3): Form ID,  Category Name (Database),
#                Subcategory Name (Table)
# Returns:
# Description:
######################################################
def get_form(category, subcat, formid):
    database = category + ".db"
    conn = sqlite3.connect(database)
    c = conn.cursor()
    c.execute("SELECT * FROM {} WHERE form_id=?".format(subcat), (formid,))
    query = c.fetchone()
    c.close()
    if query is not None:
        return query
    else:
        return "404 - NOT FOUND"

######################################################
# Method Name: del_form
# Arguments (3): Form ID,  Category Name (Database),
#                Subcategory Name (Table)
# Returns:
# Description:
######################################################
def del_form(category, subcat, formid):

    if check_existence(category, subcat, formid) is not None:
        database = category + ".db"
        conn = sqlite3.connect(database)
        c = conn.cursor()
        c.execute("DELETE FROM {} WHERE form_id=?".format(subcat), (formid,))
        conn.commit()
        c.close()
        return "Deleted, 200 - OK"

    else:
        return "404 - NOT FOUND"

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
	query = "UPDATE {} SET name = ?, item = ?,\
	 		purpose = ?, cost = ?, serial = ?,\
			date = ?, maint_date = ?, repeat =?,\
            notes = ?\
			WHERE form_id = ?".format(subcat)

	attch_tbl = subcat + '_' + str(formid) + '_attch'

	query_tbl_reset = "DELETE FROM {}".format(attch_tbl)
	conn = sqlite3.connect(category + '.db')
	c = conn.cursor()
	c.execute(query, (dict['name'], dict['item'],
			  dict['purpose'], dict['cost'],\
			  dict['serial'], dict['date'],\
			  dict['maint_date'], dict['repeat'],\
              dict['notes'], formid))
	conn.commit()
	c.execute(query_tbl_reset) #Deletes the existing attachments
	conn.commit()
	conn.close()
	attach_table(category, subcat, formid, dict) #Adds the new attachments

	if c.rowcount == 0:
		return 0
	else:
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
	#This is dangerous as someone could SQL Inject
	#this statement if they new our route. Be cautious
	query = "CREATE TABLE IF NOT EXISTS {} (\
	         form_id INTEGER PRIMARY KEY,\
			 name TEXT, item TEXT, purpose TEXT, cost REAL,\
	         serial TEXT, date DATE, maint_date DATE,\
             repeat INTEGER, attach TEXT,\
			 notes TEXT)".format(subcat)

	conn = sqlite3.connect(category + '.db')
	c = conn.cursor()
	c.execute(query)
	conn.commit()
	conn.close()

######################################################
# Method Name: del_subcat
# Arguments (2): Category Name (Database),
#                Subcategory Name (Table)
# Returns: None
# Description: Deletes a subcategory (table) from the
#              given database (Category)
######################################################
def del_subcat(category, subcat):
    query = "DROP TABLE IF EXISTS {}".format(subcat)
    query_tbl = ("SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence'")
    conn = sqlite3.connect(category + ".db")
    c = conn.cursor()
    c.execute(query_tbl)
    lst_temp = list(c.fetchall())
    lst_to_fltr = [i[0] for i in lst_temp] #Converts from tuple to list#
    for subcats in lst_to_fltr:
        if subcats.startswith(subcat + '_') and subcats.endswith('_attch'):
            c.execute("DROP TABLE {}".format(subcats)) #Drops all the attach tables first
            conn.commit()
    c.execute(query) #Drops the subcat table
    conn.commit()
    conn.close()

######################################################
# Method Name: get_filter
# Arguments (2): Category Name (Database),
#                Subcategory Name (Table)
# Returns: Python dictionary
# Description: Returns every row in a subcategory (table)
#              and appends those rows to a Python Dictionary
######################################################
def get_filter(category, subcat):
	query_row = ("SELECT * FROM {}").format(subcat)

	conn = sqlite3.connect(category + ".db")
	c = conn.cursor()
	c.execute(query_row)
	conn.commit()
	rs = list(c.fetchall())
	field_names = [r[0] for r in c.description] #Gets the table schema#
	json_data = []
	for results in rs:
		json_data.append(dict(zip(field_names, results)))

	for item in json_data:
		frm_id = item['form_id']
		attch_tbl = subcat + '_' + str(frm_id) + '_attch'
		attch_lst = list(c.execute(("SELECT attach_path FROM {}").format(attch_tbl))) #gets attachments from attachment table#
		lst_to_fltr = [i[0] for i in attch_lst] #Converts tuple to list#
		item.update({'attach': lst_to_fltr})

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
	conn = sqlite3.connect(category + ".db")
	c = conn.cursor()
	c.execute(query)

	lst_temp = list(c.fetchall())
	conn.close()
	lst_to_fltr = [i[0] for i in lst_temp] #Converts from tuple to list#
	lst_fltrd = list(filter(lambda n: not n.endswith('_attch'), lst_to_fltr)) #removes attachment tables from list#
	return lst_fltrd

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

	conn = sqlite3.connect(category + '.db')
	c = conn.cursor()

	c.execute(query_create)
	conn.commit()

	for item in dict['attach']:  #Inserts all items in the attach sublist into separate rows#
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
    for filename in os.listdir(".\\"):
        if filename.endswith(".db"):
            head, tail = path.split(filename)
            dst = filepath + tail + ".bak" #Adds a .bak to the filepath#

            shutil.copy(filename, dst)
            shutil.copystat(filename, dst) #Copies file permissions#

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
            src = src[:-4]  #Removes .bak from filename on path #

            shutil.copy(src, ".\\" + ntpath.basename(src))
            shutil.copystat(src, ".\\" + ntpath.basename(src)) #Copies file permissions#

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
def search(search_str):
    databases = []
    json_str = []
    for filename in os.listdir(".\\"): #Gets the database names
        if filename.endswith(".db"):
            databases.append(filename)

    for database in databases:  #Connects to all three of the DBs one at a time
        conn = sqlite3.connect(database)
        c = conn.cursor()
        for tablerow in c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence'").fetchall():
            table = tablerow[0] #Loops through each table
            if '_attch' not in table: #Filters the attachment tables
                c.execute("SELECT * FROM {}".format(table))
                field_names = [r[0] for r in c.description] #gets the table schema
                for row in c: #Goes through every row
                    row = list(row)
                    row_srch = list(map(str, row))
                    if any(search_str in s for s in row_srch): #If match was found in the row
                        json_str.append(dict(zip(field_names, row))) #writes the entire row to a dictionary
            else:
                continue
        conn.close()
    return json_str

# if __name__ == '__main__':
	# new_subcat("Tools", "Keys")
 	# alter_form(test_data, 1, "Equipment", "AirConditioning")
	# attach_table("Equipment", "Computer", 2, test_data)
	# get_subcat("Equipment")
	# get_filter("Equipment", "Computer")
    # get_all_tables("Equipment.db")
    # backup_db("C:\\Users\\Ben3\\Desktop\\")
    # restore_backup({ "path": "C:\\Users\\Ben3\\Desktop\\"})
    # print(search("s"))
    # del_subcat("Equipment", "Computer")
