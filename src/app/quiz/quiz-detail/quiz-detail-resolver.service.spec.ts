import { TestBed } from '@angular/core/testing';

import { QuizDetailResolverService } from './quiz-detail-resolver.service';

describe('QuizDetailResolverService', () => {
  let service: QuizDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
