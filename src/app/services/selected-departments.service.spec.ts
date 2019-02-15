import { TestBed, inject } from '@angular/core/testing';

import { SelectedDepartmentsService } from './selected-departments.service';

describe('SelectedDepartmentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedDepartmentsService]
    });
  });

  it('should be created', inject([SelectedDepartmentsService], (service: SelectedDepartmentsService) => {
    expect(service).toBeTruthy();
  }));
});
