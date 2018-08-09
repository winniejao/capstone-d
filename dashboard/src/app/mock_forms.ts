  // For TABULAR
  // Table based on: https://codeburst.io/display-a-table-using-components-with-angular-4-f13f0971666d

import { Form } from './form'

export const MOCK_FORMS: Form[] = [
  { formid: 1, category: "Equipment", subcat: 'Boiler', name: 'Boiler 1', item: 'Wood Pellet', purpose: 'To Burn', cost: 24.99, serial: '134-567-890', date: '07-03-2018', attachment: null, notes: 'All of this should be burned at once', maint_date: '2018-09-12', repeat: 0 },
  { formid: 2, category: "Equipment", subcat: 'Boiler', name: 'Boiler 2', item: 'Wood Pellet', purpose: 'To Burn', cost: 24.99, serial: '134-567-890', date: '07-03-2018', attachment: null, notes: 'All of this should be burned at once', maint_date: '2018-09-12', repeat: 0 },
  { formid: 3, category: "Equipment", subcat: 'Boiler', name: 'Boiler 3', item: 'Wood Pellet', purpose: 'To Burn', cost: 24.99, serial: '134-567-890', date: '07-03-2018', attachment: null, notes: 'All of this should be burned at once', maint_date: '2018-09-12', repeat: 0 },
  { formid: 4, category: "Equipment", subcat: 'Boiler', name: 'Boiler 4', item: 'Wood Pellet', purpose: 'To Burn', cost: 24.99, serial: '134-567-890', date: '07-03-2018', attachment: null, notes: 'All of this should be burned at once', maint_date: '2018-09-12', repeat: 0 },
  { formid: 5, category: "Equipment", subcat: 'Stove', name: 'Stove 1', item: 'Gas', purpose: 'To Burn', cost: 10.99, serial: '034-567-840', date: '07-03-2018', attachment: null, notes: 'Poof', maint_date: '2018-09-12', repeat: 0 }
];

export const MOCK_NUMBER: number = 5;
