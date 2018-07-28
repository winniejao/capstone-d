import sqlite3
import json
import itertools

test_data = {
	"form_id": "4",
	"name": "It's Me",
	"item": "Now Let's See",
	"purpose": "To Burn ",
	"cost": "24.99 ",
	"serial": "134-987-2210 ",
	"date": "07-13-18 ",
	"attach": ["C:\\Users\\Christian\\Forms\\Thing.pdf", "Q.jpg", "A.png", "s.png"],
	"notes": "All of these need to burn"
}

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

	attch_tbl = subcat + '_' + str(formid)

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
	print(c.fetchall())
	conn.close()

def get_filter(category, subcat):
	query = ("SELECT * FROM {}").format(subcat)
	conn = sqlite3.connect(category + '.db')
	c = conn.cursor()
	c.execute(query)
	print(c.fetchall())
	conn.close()

def get_subcat(category):
	query = ("SELECT name FROM sqlite_master WHERE type='table';")
	conn = sqlite3.connect(category + '.db')
	c = conn.cursor()
	c.execute(query)
	print(c.fetchall())
	conn.close()

def attach_table(category, subcat, formid, dict):
	attch_tbl = subcat + '_' + str(formid)
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


if __name__ == '__main__':
	alter_form(test_data, 1, "Equipment", "Computer")
	# attach_table("Computer", 1)
