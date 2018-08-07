import unittest
import req
import sqlite3
import os

test_data = {
    "name": "Boiler1",
    "item": "Exhaust Pipe",
    "purpose": "To Burn ",
    "cost": "99.99 ",
    "serial": "122-937-2210 ",
    "date": "07-13-18 ",
    "attach": ["Q.jpg", "A.png", "s.png"],
    "notes": "All of these need to burn"
}

class TestReq(unittest.TestCase):

	def setUp(self):
		##Setup temporary database
		conn = sqlite3.connect(':memory:')
		c.conn.cursor()

    def test_add_form(self):
        result = req.add_form("Equipment", "Boiler", test_data)
        self.assertEqual(result, test_data)

	def tearDown(self):
		##Deletes the database
		os.remove("unittest.db")

if __name__ == '__name__':
    unittest.main()
