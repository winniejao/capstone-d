## Creates the Form class
class Form:
<<<<<<< HEAD
    def __init__(self, formid, subcat, name, purpose, cost, serial, date, attach, notes):
        self.formid = formid
        self.subcat = subcat
=======
    def __init__(self, parent, name):
        self.parent = parent
>>>>>>> 1021a79f622ea149e9defbbd189d4c10472457e6
        self.name = name
        # self.purpose = purpose
        # self.cost = cost
        # self.serial = serial
        # self.date = date
        # self.attach = attach
        # self.notes = notes

##purpose, cost, serial, date, attach, notes
## Creates the manual class
class manual:
    def __init__(self, text):
        self.text = ""
