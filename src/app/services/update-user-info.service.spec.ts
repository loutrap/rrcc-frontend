import { TestBed, inject } from '@angular/core/testing';

import { UpdateUserInfoService } from './update-user-info.service';

describe('UpdateUserInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateUserInfoService]
    });
  });

  it('should be created', inject([UpdateUserInfoService], (service: UpdateUserInfoService) => {
    expect(service).toBeTruthy();
  }));
});
