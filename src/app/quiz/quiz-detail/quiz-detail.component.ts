import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { MonetizationService } from 'ngx-monetization';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss'],
})
export class QuizDetailComponent implements OnInit {
  public quiz: Quiz;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private monetization: MonetizationService,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: { quiz: Quiz }) => {
      this.quiz = data.quiz;

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
}
