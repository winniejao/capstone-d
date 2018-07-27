import Form
import sqlite3
import json

test_data = {
	"form_id": "4",
	"name": "It's Me",
	"item": "Now Let's See",
	"purpose": "To Burn ",
	"cost": "24.99 ",
	"serial": "134-987-2210 ",
	"date": "07-13-18 ",
	"attach": ["C:\\Users\\Christian\\Forms\\Thing.pdf", "Thing.jpg"],
	"notes": "All of these need to burn"
}

def add_form(Form):
	print("sure")
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
			date = ?, notes = ?\
			WHERE form_id = ?".format(subcat)

	print(dict['attach'][0])
	print(dict['attach'][1])
	conn = sqlite3.connect(category + '.db')
	c = conn.cursor()
	c.execute(query, (dict['name'], dict['item'],
			  dict['purpose'], dict['cost'],\
			  dict['serial'], dict['date'],\
			  dict['notes'], formid))
	conn.commit()
	conn.close()
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
	         serial TEXT, date TEXT, attach BLOB,\
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

if __name__ == '__main__':
	alter_form(test_data, 4, "Computer")
