## Creates the Form class
class Form:
    def __init__(self, formid, subcat, name, purpose, cost, serial, date, attach, notes):
        self.formid = formid
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
