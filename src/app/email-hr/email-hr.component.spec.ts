import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailHRComponent } from './email-hr.component';

describe('EmailHRComponent', () => {
  let component: EmailHRComponent;
  let fixture: ComponentFixture<EmailHRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailHRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
