import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewitemformComponent } from './viewitemform.component';

describe('ViewitemformComponent', () => {
  let component: ViewitemformComponent;
  let fixture: ComponentFixture<ViewitemformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewitemformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewitemformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
