import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSubComponent } from './delete-sub.component';

describe('DeleteSubComponent', () => {
  let component: DeleteSubComponent;
  let fixture: ComponentFixture<DeleteSubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteSubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
