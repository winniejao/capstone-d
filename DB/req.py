import sqlite3
import json

def add_form():
	pass

    # return data

def del_form(dict, formid):
    print (formid)
    return dict

def get_form(dict, formid):
    print (formid)
    return dict

def alter_form(dict, formid, category, subcat):
	query = "UPDATE {} SET name = ?, item = ?,\
	 		purpose = ?, cost = ?, serial = ?,\
			date = ?, attach = ?, notes = ?\
			WHERE form_id = ?".format(subcat)

	attch_tbl = subcat + '_' + str(formid) + '_attch'

	query2 = "INSERT OR REPLACE INTO {} (attach_id, attach_path) VALUES(?, ?)".format(attch_tbl)
	query3 = "DELETE FROM {}".format(attch_tbl)
	conn = sqlite3.connect(category + '.db')
	c = conn.cursor()
	c.execute(query, (dict['name'], dict['item'],
			  dict['purpose'], dict['cost'],\
			  dict['serial'], dict['date'],\
			  attch_tbl, dict['notes'], formid))
	conn.commit()
	c.execute(query3)
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
	         form_id INTEGER PRIMARY KEY AUTOINCREMENT,\
			 name TEXT, item TEXT, purpose TEXT, cost REAL,\
	         serial TEXT, date TEXT, attach TEXT,\
			 notes TEXT)".format(subcat)

	conn = sqlite3.connect(category + '.db')
	c = conn.cursor()
	c.execute(query)
	conn.close()

def get_filter(category, subcat):
	query_row = ("SELECT * FROM {}").format(subcat)

	conn = sqlite3.connect(category + '.db')
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
	conn = sqlite3.connect(category + '.db')
	c = conn.cursor()
	c.execute(query)

	lst_temp = list(c.fetchall())
	conn.close()
	lst_to_fltr = [i[0] for i in lst_temp]
	lst_fltrd = list(filter(lambda n: not n.endswith('_attch'), lst_to_fltr))
	return lst_fltrd


def attach_table(category, subcat, formid, dict):
	attch_tbl = subcat + '_' + str(formid) + '_attch'
	query_nsrt = "INSERT OR REPLACE INTO {} (attach_id, attach_path) VALUES(?, ?)".format(attch_tbl)

	conn = sqlite3.connect(category + '.db')
	c = conn.cursor()
	query_create = "CREATE TABLE IF NOT EXISTS {} (\
					attach_id TEXT,\
					attach_path TEXT UNIQUE,\
					FOREIGN KEY (attach_id) REFERENCES\
					 {}(attach))".format(attch_tbl, subcat)
	c.execute(query_create)
	conn.commit()

	for item in dict['attach']:
		c.execute(query_nsrt, (attch_tbl, item))

	conn.commit()
	conn.close()


# if __name__ == '__main__':
	# new_subcat("Equipment", "ArcWelder")
 	# alter_form(test_data, 1, "Equipment", "AirConditioning")
	# attach_table("Equipment", "Computer", 2, test_data)
	# get_subcat("Equipment")
	# get_filter("Equipment", "Computer")
