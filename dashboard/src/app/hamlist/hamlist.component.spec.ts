import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HamlistComponent } from './hamlist.component';

describe('HamlistComponent', () => {
  let component: HamlistComponent;
  let fixture: ComponentFixture<HamlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HamlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HamlistComponent);
    component = fixture.componentInstance;
    component.currentState = 'out';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
