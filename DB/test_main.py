import unittest
import json
from main import app
import main

test_data = {
	"form_id": "1197",
	"name": "Boiler1",
	"item": "Wood Pellets",
	"purpose": "To Burn ",
	"cost": "24.99 ",
	"serial": "134-987-2210 ",
	"date": "7/13/2018 ",
	"attach": "C:/Users/Christian/Forms/Thing.pdf",
	"notes": "All of these need to burn"
}

class TestMain(unittest.TestCase):
    def setUp(self):
        self.app = main.app.test_client()
        self.app.testing = True

if __name__ == '__main__':
    unittest.main()
