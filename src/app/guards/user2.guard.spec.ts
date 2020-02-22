import { TestBed, async, inject } from '@angular/core/testing';

import { UserGuard2 } from './user2.guard';

describe('UserGuard2', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGuard2]
    });
  });

  // it('should ...', inject([UserGuard2], (guard: UserGuard2) => {
  //   expect(guard).toBeTruthy();
  // }));
});
