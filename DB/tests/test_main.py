import unittest
import json
from .. import main

test_data = {
    "name": "State POS Computer",
    "item": "Card Reader",
    "purpose": "Handles credit card payments",
    "cost": "299.99",
    "serial": "12867-9992837-2323683264823",
    "date": "2018-08-25",
    "maint_date": "2018-12-25",
    "repeat": "6",
    "attach": ["E:/Test1234.txt", "E:/file1.txt", "E:/Gee.txt", "E:/Oh.docx"],
    "notes": "No chip reader functionality just yet",
    "completed": "1"
}


class TestMain(unittest.TestCase):
    def setUp(self):
        self.app = main.app.test_client()
        self.app.testing = True

if __name__ == '__main__':
    unittest.main()
