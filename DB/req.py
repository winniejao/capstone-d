import Form
import sqlite3
import json

test_data = {
    "form_id": "4",
    "name": "Computer",
    "item": "Wood Pellets",
    "purpose": "To Burn ",
    "cost": "24.99 ",
    "serial": "134-987-2210 ",
    "date": "7/13/2018 ",
    "attach": "C:/Users/Christian/Forms/Thing.pdf",
    "notes": "All of these need to burn"
}


def add_form(formInfo):
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    c.execute("INSERT INTO Boiler(form_id, name, item, purpose, cost, serial, date, notes) VALUES(?,?,?,?,?,?,?,?)",
              (formInfo["form_id"],
               formInfo["name"],
               formInfo["item"],
               formInfo["purpose"],
               formInfo["cost"],
               formInfo["serial"],
               formInfo["date"],
               formInfo["notes"]))
    conn.commit()
    conn.close()
    return "values have been added"


# return data

def get_form(formid):
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    c.execute("SELECT name FROM Boiler WHERE form_id=?", (formid,))
    query = c.fetchone()
    return query


def del_form(formid):
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    c.execute("DELETE FROM Boiler WHERE form_id=?", (formid,))
    message = conn.commit()

    return "Deleted" if message is None else "Not Deleted"

def alter_form(dict, formid, subcat):
    query = "UPDATE {} SET item = ? WHERE form_id = ?".format(subcat)
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    c.execute(query, (dict['item'], formid))
    conn.commit()
    conn.close()
    return dict


def new_subcat(subcat):
    # This is dangerous as someone could SQL Inject
    # this statement if they new our route. Be cautious
    query = "CREATE TABLE IF NOT EXISTS {} (\
	form_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, item TEXT, purpose TEXT, cost REAL,\
	serial TEXT, date TEXT, attach BLOB, notes TEXT)".format(subcat)
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    c.execute(query)
    print(c.fetchall())
    conn.close()


def get_filter(category, subcat):
    query = ("SELECT * FROM {}").format(subcat)
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    c.execute(query)
    print(c.fetchall())
    conn.close()


def get_subcat(category):
    query = ("SELECT name FROM sqlite_master WHERE type='table';")
    conn = sqlite3.connect('dashboard.db')
    c = conn.cursor()
    c.execute(query)
    conn.close()

# if __name__ == '__main__':
# alter_form(test_data, 4, "Computer")
