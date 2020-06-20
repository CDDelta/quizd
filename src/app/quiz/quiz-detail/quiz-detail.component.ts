import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { MonetizationService } from 'ngx-monetization';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss'],
})
export class QuizDetailComponent implements OnInit {
  public quiz: Quiz;

  public quizForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private monetization: MonetizationService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { quiz: Quiz }) => {
      this.quiz = data.quiz;

      this.quizForm = this.fb.group({
        answers: this.fb.array(
          Array(this.quiz.questions.length).fill(this.fb.control([''])),
        ),
      });

      if (this.quiz.paymentPointer)
        this.monetization.setPaymentPointer(this.quiz.paymentPointer);
    });

    // Remove payment pointer when user navigates away from quiz.
    this.router.events
      .pipe(filter((e) => e instanceof NavigationStart))
      .subscribe(() =>
        this.monetization.setPaymentPointer(environment.defaultPaymentPointer),
      );
  }

  showResults(): void {
    for (const question of this.quiz.questions) {
    }
  }
}
