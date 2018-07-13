import sqlite3
import form
import request

## Import the JSON request file

## parse action code
# 1 - add Form
# 2 - delete form
# 3 - alter data in a Form
# 4 - alter a column in a form
# 5 - create a new subcategory (table)
# 6 - Return specific filter range of data

## call function from request.py based on the action code

## if 1 - 5 return a success code and encode in JSON

## if 6 return the desired information, encoded in JSON

##Either Save JSON file in appropriate location or pipeline into Angular
