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
    "date": "2018-12-18",
    "attach": ["Q.jpg", "A.png", "s.png"],
    "notes": "All of these need to burn"
}

def get_all_tables(database):
    conn = sqlite3.connect(database)
    c = conn.cursor()
    c.execute("SELECT name FROM sqlite_master WHERE type = \"table\"")
    table_list = c.fetchall()
    c.close()
    return table_list

def check_existence(category, subcat, form_id):
    database = category + ".db"
    conn = sqlite3.connect(database)
    c = conn.cursor()
    c.execute("SELECT * FROM {} WHERE form_id = ?".format(subcat), (form_id,))
    return_query = c.fetchone()
    c.close()
    return return_query

def add_form(category, subcat, formInfo):
    form_id = datetime.datetime.now()
    form_id = str(form_id).replace("-", "").replace(" ", "").replace(":", "").split(".", 1)[0]

    attachment = subcat + "_" + form_id
    database = category + ".db"
    table_list = get_all_tables(database)

    if subcat not in table_list:
        new_subcat(category, subcat)

    # if formInfo["attach"]:
        # attach_table(category, subcat, form_id, formInfo)

    if check_existence(category, subcat, form_id) is None:
        conn = sqlite3.connect(database)
        c = conn.cursor()
        c.execute("INSERT INTO {}(form_id, name, item, purpose, cost, serial, date, attach, notes) VALUES(?,?,?,?,?,?,?,"
              "?,?)".format(subcat),
              (form_id,
               formInfo["name"],
               formInfo["item"],
               formInfo["purpose"],
               formInfo["cost"],
               formInfo["serial"],
               formInfo["date"],
               attachment,
               formInfo["notes"]))
        conn.commit()
        conn.close()
        return form_id + ", 201 - CREATED"
    else:
        return "405 - NOT FOUND"

    # return data

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


def alter_form(dict, formid, category, subcat):
	query = "UPDATE {} SET name = ?, item = ?,\
	 		purpose = ?, cost = ?, serial = ?,\
			date = ?, attach = ?, notes = ?\
			WHERE form_id = ?".format(subcat)

	attch_tbl = subcat + '_' + str(formid) + '_attch'

	query_tbl_reset = "DELETE FROM {}".format(attch_tbl)
	conn = sqlite3.connect(category + '.db')
	c = conn.cursor()
	c.execute(query, (dict['name'], dict['item'],
			  dict['purpose'], dict['cost'],\
			  dict['serial'], dict['date'],\
			  attch_tbl, dict['notes'], formid))
	conn.commit()
	c.execute(query_tbl_reset)
	conn.commit()
	conn.close()
	attach_table(category, subcat, formid, dict)

	if c.rowcount == 0:
		return 0
	else:
		return 1

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

def get_filter(category, subcat):
	query_row = ("SELECT * FROM {}").format(subcat)

	conn = sqlite3.connect(category + ".db")
	c = conn.cursor()
	c.execute(query_row)
	conn.commit()
	rs = list(c.fetchall())
	field_names = [r[0] for r in c.description]
	json_data = []
	for results in rs:
		json_data.append(dict(zip(field_names, results)))

	for item in json_data:
		frm_id = item['form_id']
		attch_tbl = subcat + '_' + str(frm_id) + '_attch'
		attch_lst = list(c.execute(("SELECT attach_path FROM {}").format(attch_tbl)))
		lst_to_fltr = [i[0] for i in attch_lst]
		item.update({'attach': lst_to_fltr})

	conn.close()
	return json_data

def get_subcat(category):
	query = ("SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence'")
	conn = sqlite3.connect(category + ".db")
	c = conn.cursor()
	c.execute(query)

	lst_temp = list(c.fetchall())
	conn.close()
	lst_to_fltr = [i[0] for i in lst_temp]
	lst_fltrd = list(filter(lambda n: not n.endswith('_attch'), lst_to_fltr))
	return lst_fltrd

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

	for item in dict['attach']:
		c.execute(query_nsrt, (attch_tbl, item))

	conn.commit()
	conn.close()

def backup_db(flpth):
    filepath = flpth["path"]
    for filename in os.listdir(".\\"):
        if filename.endswith(".db"):
            head, tail = path.split(filename)
            dst = filepath + tail + ".bak"

            shutil.copy(filename, dst)
            shutil.copystat(filename, dst)

def restore_backup(flpth):
    filepath = flpth["path"]
    for filename in os.listdir(filepath):
        if filename.endswith(".db.bak"):
            src = os.path.join(filepath, filename)
            src = src[:-4]

            shutil.copy(src, ".\\" + ntpath.basename(src))
            shutil.copystat(src, ".\\" + ntpath.basename(src))

def search(search_str):
    databases = []
    json_str = []
    for filename in os.listdir(".\\"):
        if filename.endswith(".db"):
            databases.append(filename)

    for database in databases:
        conn = sqlite3.connect(database)
        c = conn.cursor()
        for tablerow in c.execute("SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence'").fetchall():
            table = tablerow[0]
            if '_attch' not in table:
                c.execute("SELECT * FROM {}".format(table))
                field_names = [r[0] for r in c.description]
                for row in c:
                    row = list(row)
                    row_srch = list(map(str, row))
                    if any(search_str in s for s in row_srch):
                        json_str.append(dict(zip(field_names, row)))
            else:
                continue
        conn.close()
    return json_str

if __name__ == '__main__':
	# new_subcat("Tools", "Keys")
 	# alter_form(test_data, 1, "Equipment", "AirConditioning")
	# attach_table("Equipment", "Computer", 2, test_data)
	# get_subcat("Equipment")
	# get_filter("Equipment", "Computer")
    # get_all_tables("Equipment.db")
    # backup_db("C:\\Users\\Ben3\\Desktop\\")
    # restore_backup("C:\\Users\\Ben3\\Desktop\\")
    print(search("s"))
