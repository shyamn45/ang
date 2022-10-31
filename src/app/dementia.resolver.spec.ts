import { TestBed } from '@angular/core/testing';

import { DementiaResolver } from './dementia.resolver';

describe('DementiaResolver', () => {
  let resolver: DementiaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DementiaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
