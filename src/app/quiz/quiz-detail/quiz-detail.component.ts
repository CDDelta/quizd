import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { MonetizationService } from 'ngx-monetization';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import {
  TextQuestion,
  NumberQuestion,
  DateQuestion,
  MultipleChoiceQuestion,
} from 'src/app/models/question';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrls: ['./quiz-detail.component.scss'],
})
export class QuizDetailComponent implements OnInit {
  public quiz: Quiz;
  public quizForm: FormGroup;
  public answersShown = false;

  public pointScore = 0;
  public percentageScore = 0;

  get answerControls(): AbstractControl[] {
    return (this.quizForm.get('answers') as FormArray).controls;
  }

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
          Array(this.quiz.questions.length)
            .fill(0)
            .map(() => this.fb.control('')),
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
    for (let i = 0; i < this.answerControls.length; i++) {
      const control = this.answerControls[i];
      const question = this.quiz.questions[i];

      if (question.type === 'mc') {
        const mcq = question as MultipleChoiceQuestion;
        if (mcq.correctAnswers.findIndex((a) => a === control.value) < 0)
          control.setErrors({
            incorrectAnswer: mcq.correctAnswers.join(' , '),
          });
      } else {
        let correctAnswer: string;
        if (question.type === 'txt')
          correctAnswer = (question as TextQuestion).correctAnswer;
        else if (question.type === 'num')
          correctAnswer = (question as NumberQuestion).correctAnswer.toString();
        else if (question.type === 'date')
          correctAnswer = (question as DateQuestion).correctAnswer.toString();

        if (control.value !== correctAnswer)
          control.setErrors({ incorrectAnswer: correctAnswer });
      }
    }

    for (const answer of this.answerControls)
      if (answer.valid) this.pointScore++;

    this.percentageScore = this.pointScore / this.quiz.questions.length;

    this.answersShown = true;
  }

  shareResults(): void {}
}
