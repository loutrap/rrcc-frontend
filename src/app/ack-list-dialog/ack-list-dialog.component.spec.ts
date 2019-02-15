import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AckListDialogComponent } from './ack-list-dialog.component';

describe('AckListDialogComponent', () => {
  let component: AckListDialogComponent;
  let fixture: ComponentFixture<AckListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AckListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AckListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
