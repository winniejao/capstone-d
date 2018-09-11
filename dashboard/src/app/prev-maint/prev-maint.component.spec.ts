import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevMaintComponent } from './prev-maint.component';

describe('PrevMaintComponent', () => {
  let component: PrevMaintComponent;
  let fixture: ComponentFixture<PrevMaintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevMaintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevMaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
