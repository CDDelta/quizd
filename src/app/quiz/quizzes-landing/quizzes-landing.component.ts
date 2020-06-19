import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { flatMap, scan, tap, map } from 'rxjs/operators';
import { Quiz } from 'src/app/models/quiz';
import { QuizService } from 'src/app/services/quiz.service';

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
    quizzes: Quiz[];
  }>;
  public loadMoreEvent$ = new BehaviorSubject<any>(null);

  private quizIds: string[];
  private quizzes$ = new BehaviorSubject<Quiz[]>([]);
  private quizzesLoading$ = new BehaviorSubject<boolean>(true);
  private lastQuizIndex = 0;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizIds = ['i-mbEn0BWZtbmYnAMf94IwgPw4WOnhu2HrjRSFZ7AhE'];

    this.loadMoreEvent$
      .pipe(
        tap(() => this.quizzesLoading$.next(true)),
        flatMap(() => {
          const quizRequests = Promise.allSettled(
            this.quizIds
              .slice(this.lastQuizIndex, this.lastQuizIndex + PAGE_SIZE)
              .map((quizId) => this.quizService.getQuiz(quizId)),
          );

          this.lastQuizIndex = Math.min(
            this.lastQuizIndex + PAGE_SIZE,
            this.quizIds.length,
          );

          return quizRequests;
        }),
        map((results) =>
          results
            .filter((r) => r.status === 'fulfilled')
            .map((r) => (r as any).value as Quiz),
        ),
        scan((whole, page) => whole.concat(page)),
        tap(() => this.quizzesLoading$.next(false)),
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
