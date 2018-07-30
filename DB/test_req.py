import unittest
import req

test_data = {
	"formID": "1197",
	"category": "Landscape",
	"name": "Boiler1",
	"item": "Wood Pellets",
	"purpose": "To Burn ",
	"cost": "24.99 ",
	"serial": "134-987-2210 ",
	"date": "7/13/2018 ",
	"attach": "C:/Users/Christian/Forms/Thing.pdf",
	"notes": "All of these need to burn"
}

class TestReq(unittest.TestCase):

    def test_add_form(self):
        result = req.add_form(test_data)
        self.assertEqual(result, test_data)

if __name__ == '__name__':
    unittest.main()
