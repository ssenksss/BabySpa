import { TestBed } from '@angular/core/testing';

import { Terms } from './terms';

describe('Terms', () => {
  let service: Terms;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Terms);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
