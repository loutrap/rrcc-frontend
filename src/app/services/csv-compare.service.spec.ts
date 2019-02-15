import { TestBed, inject } from '@angular/core/testing';

import { CsvCompareService } from './csv-compare.service';

describe('CsvCompareService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsvCompareService]
    });
  });

  it('should be created', inject([CsvCompareService], (service: CsvCompareService) => {
    expect(service).toBeTruthy();
  }));
});
