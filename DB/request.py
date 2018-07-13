import form

#Handle 1
    #Add a form to an existing table
def add_form(json_object):
    ##pass
    ##Transfer python ccnverted JSON object to add_form
    f = json_object
    if json_object.item:
        ('''ADD json_object IN json_object.item''')
    else:
        ('''CREATE json_object.item IN db''')
        ('''ADD json_object IN table_json_object.item''')
    return success

#Handle 2
    #Delete a form from an existing table
def del_form():
    pass
#Handle 3
    #Alter the data in table with values category/subcategory/item with the given JSON data
def alter_data():
    pass
#Handle 4
    #Alter the column in a table with values category/subcategory/item with the given column change
def alter_colum():
    pass
#Handle 5
    #Create a new table given a category/subcategory
def new_item():
    pass
#Handle 6
    #Apply filter to given data and return that data
def apply_filter():
    pass
