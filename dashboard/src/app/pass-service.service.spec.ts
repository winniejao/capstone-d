import { TestBed, inject } from '@angular/core/testing';

import { PassServiceService } from './pass-service.service';

describe('PassServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassServiceService]
    });
  });

  it('should be created', inject([PassServiceService], (service: PassServiceService) => {
    expect(service).toBeTruthy();
  }));
});
