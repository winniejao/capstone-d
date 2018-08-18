import { TestBed, inject } from '@angular/core/testing';

import { ItemfieldsService } from './itemfields.service';

describe('ItemfieldsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ItemfieldsService]
    });
  });

  it('should be created', inject([ItemfieldsService], (service: ItemfieldsService) => {
    expect(service).toBeTruthy();
  }));
});
