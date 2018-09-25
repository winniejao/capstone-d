import unittest
import sqlite3
import context

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
    pass

if __name__ == '__name__':
    unittest.main()
