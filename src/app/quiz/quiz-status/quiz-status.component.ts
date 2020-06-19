import { Component, OnInit } from '@angular/core';
import { Observable, timer, combineLatest } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { QuizService } from '../../services/quiz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-status',
  templateUrl: './quiz-status.component.html',
  styleUrls: ['./quiz-status.component.scss'],
})
export class QuizStatusComponent implements OnInit {
  public quizId: string;
  public quizPublished$: Observable<boolean>;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.quizPublished$ = combineLatest(
      this.route.params.pipe(
        map((params) => {
          this.quizId = params['quizId'];
          return this.quizId;
        }),
      ),
      timer(0, 30 * 1000),
    ).pipe(
      flatMap(([quizId]) => this.quizService.getQuizPublishStatus(quizId)),
    );
  }
}
