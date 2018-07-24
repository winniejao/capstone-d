import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SubcategoryComponent } from './subcategory.component';

describe('SubcategoryComponent', () => {
  let component: SubcategoryComponent;
  let fixture: ComponentFixture<SubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryComponent ],
      imports: [ FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should start with theList and display being equal', () => {
    expect(component.theList).toEqual(component.display);
  })

  it('theList and display should not be equal if a new letter is selected', () => {
    expect(component.theList).toEqual(component.display);
    component.select('A');
    expect(component.theList).not.toBe(component.display);
  })

  it('should render the text of display', () => {
    //    const fixture = TestBed.createComponent(AppComponent);
    //fixture.detectChanges();
    //const compiled = fixture.debugElement.nativeElement;
    //expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  })

});

describe('Clear method', () => {
  let component: SubcategoryComponent;
  let fixture: ComponentFixture<SubcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryComponent ],
      imports: [ FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('clear() should set all boxes as false', () => {
    component.selected = 'TestValue';
    component.addBox = true;
    component.confirmBox = true;
    expect(component.selected).toBe('TestValue');
    expect(component.addBox).toBeTruthy();
    expect(component.confirmBox).toBeTruthy();
    component.clear();
    expect(component.selected).toBe("");
    expect(component.addBox).toBeFalsy();
    expect(component.confirmBox).toBeFalsy();
    
  })
  it('clear() keeps all boxes as false', () => {
    expect(component.selected).toBe("");
    expect(component.addBox).toBeFalsy();
    expect(component.confirmBox).toBeFalsy();
    component.clear();
    expect(component.selected).toBe("");
    expect(component.addBox).toBeFalsy();
    expect(component.confirmBox).toBeFalsy();
    
  })
});

