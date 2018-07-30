import { TestBed, inject } from '@angular/core/testing';

import { TestAPIService } from './test-api.service';

describe('TestAPIService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestAPIService]
    });
  });

  it('should be created', inject([TestAPIService], (service: TestAPIService) => {
    expect(service).toBeTruthy();
  }));
});
