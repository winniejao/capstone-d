import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditemformComponent } from './additemform.component';

describe('AdditemformComponent', () => {
  let component: AdditemformComponent;
  let fixture: ComponentFixture<AdditemformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditemformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditemformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
