import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, EMPTY, from } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { QuizService } from 'src/app/services/quiz.service';
import { Quiz } from 'src/app/models/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizDetailResolverService implements Resolve<Quiz> {
  constructor(private quizService: QuizService, private router: Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Quiz> | Observable<never> {
    let quizId = route.paramMap.get('quizId');

    return from(this.quizService.getQuiz(quizId)).pipe(
      take(1),
      mergeMap((quiz) => {
        if (quiz) {
          return of(quiz);
        } else {
          this.router.navigateByUrl('/');
          return EMPTY;
        }
      }),
    );
  }
}
