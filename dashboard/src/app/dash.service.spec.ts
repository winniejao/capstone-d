import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashService } from './dash.service';

describe('DashService', () => {
  let testService: DashService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [DashService]
    });

    testService = TestBed.get(DashService);
  });

  it('should be created', () => {
    expect(testService).toBeTruthy();
  });

  it('should figure out async testing', () => {
    testService.getTest().subscribe(val => console.log("Ran with value" + val));
  });

});
