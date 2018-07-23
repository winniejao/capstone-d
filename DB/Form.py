## Creates the Form class
import req

class Form:
    def __init__(self, category, subcat, name, purpose, cost, serial, date, attach, notes):
        self.category = category
        self.subcat = subcat
        self.name = name
        self.purpose = purpose
        self.cost = cost
        self.serial = serial
        self.date = date
        self.attach = attach
        self.notes = notes

##purpose, cost, serial, date, attach, notes
## Creates the manual class
class manual:
    def __init__(self, text):
        self.text = ""
