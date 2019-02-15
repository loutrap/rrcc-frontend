import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDepartmentsComponent } from './select-departments.component';

describe('SelectDepartmentsComponent', () => {
  let component: SelectDepartmentsComponent;
  let fixture: ComponentFixture<SelectDepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
