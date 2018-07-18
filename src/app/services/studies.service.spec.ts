import { TestBed, inject } from '@angular/core/testing';

import { StudiesService } from './studies.service';

describe('StudiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudiesService]
    });
  });

  it('should be created', inject([StudiesService], (service: StudiesService) => {
    expect(service).toBeTruthy();
  }));
});
