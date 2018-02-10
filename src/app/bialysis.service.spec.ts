import { TestBed, inject } from '@angular/core/testing';

import { BialysisService } from './bialysis.service';

describe('BialysisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BialysisService]
    });
  });

  it('should be created', inject([BialysisService], (service: BialysisService) => {
    expect(service).toBeTruthy();
  }));
});
