import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { flatMap, scan, tap, map } from 'rxjs/operators';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';
import { WithId } from 'src/app/models/with-id';

const PAGE_SIZE = 9;

@Component({
  selector: 'app-quizzes-landing',
  templateUrl: './quizzes-landing.component.html',
  styleUrls: ['./quizzes-landing.component.scss'],
})
export class QuizzesLandingComponent implements OnInit {
  public quizzesQuery$: Observable<{
    loading: boolean;
    atEnd: boolean;
    quizzes: (Quiz & WithId)[];
  }>;
  public loadMoreEvent$ = new BehaviorSubject<any>(null);

  private quizIds: string[] = [];
  private quizzes$ = new BehaviorSubject<(Quiz & WithId)[]>([]);
  private quizzesLoading$ = new BehaviorSubject<boolean>(true);
  private lastQuizIndex = 0;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadMoreEvent$
      .pipe(
        tap(() => this.quizzesLoading$.next(true)),
        flatMap(() =>
          !this.quizIds.length
            ? this.quizService.getQuizIds()
            : Promise.resolve(this.quizIds),
        ),
        tap((quizIds) => (this.quizIds = quizIds)),
        flatMap(() =>
          Promise.allSettled(
            this.quizIds
              .slice(this.lastQuizIndex, this.lastQuizIndex + PAGE_SIZE)
              .map((quizId) => this.quizService.getQuiz(quizId)),
          ),
        ),
        map((results) =>
          results
            .map((r, i) => {
              if (r.status === 'rejected' || !r.value)
                return null;

              const q = r.value as Quiz & WithId;
              q.id = this.quizIds[this.lastQuizIndex + i];
              return q;
            })
            .filter((q) => q),
        ),
        scan((whole, page) => whole.concat(page)),
        tap(() => {
          this.lastQuizIndex = Math.min(
            this.lastQuizIndex + PAGE_SIZE,
            this.quizIds.length,
          );

          this.quizzesLoading$.next(false);
        }),
      )
      .subscribe(this.quizzes$);

    this.quizzesQuery$ = combineLatest(
      this.quizzesLoading$,
      this.quizzes$,
    ).pipe(
      map(([loading, quizzes]) => ({
        loading,
        atEnd: this.lastQuizIndex === this.quizIds.length,
        quizzes,
      })),
    );
  }
}
