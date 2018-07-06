# Form class for the DB
import sqlite3

class Form:

    def __init__(self, category, subcategory, item, name, purpose, cost, serial, date, attach, notes):
        self.category = category                #Equipment (string)
        self.subcategory = subcategory          #Boiler (string)
        self.item = item                        #Boiler1 (string)
        self.name = name                        #Exhaust Valve (String)
        self.purpose = purpose                  #Some purpose (string)
        self.cost = cost                        #Cost (float format: append $ to front (xx.xx)) 
        self.serial = serial                    #Serial Number (Integer -- can include dashes "-")
        self.date = date                        #Date form was made (XX/XX/XXXX)
        self.attach = attach                    #Filepath(s) 
        self.notes = notes                      #Notes (String)

    def __repr__(self_:
        return "Form('{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}', '{}',)"
                 .format(self.category, self.subcategory, self.item, self.name, 
                         self.purpose, self.cost, self.serial, self.date, self.attach, self.notes)
    
