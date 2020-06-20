import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Quiz } from 'src/app/models/quiz';
import { MonetizationService } from 'ngx-monetization';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import {
  TextQuestion,
  NumberQuestion,
  DateQuestion,
  MultipleChoiceQuestion,
} from 'src/app/models/question';
import { ShareService } from 'src/app/services/share.service';

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
    public share: ShareService,
    private fb: FormBuilder,
    @Inject(DOCUMENT) private document: Document,
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
      } else if (question.type === 'date') {
        const dq = question as DateQuestion;
        if (dq.correctAnswer.valueOf() !== new Date(control.value).valueOf())
          control.setErrors({
            incorrectAnswer: dq.correctAnswer.toLocaleDateString(),
          });
      } else {
        let correctAnswer: string;
        if (question.type === 'txt')
          correctAnswer = (question as TextQuestion).correctAnswer;
        else if (question.type === 'num')
          correctAnswer = (question as NumberQuestion).correctAnswer.toString();

        if (control.value != correctAnswer)
          control.setErrors({ incorrectAnswer: correctAnswer });
      }
    }

    for (const answer of this.answerControls)
      if (answer.valid) this.pointScore++;

    this.percentageScore = this.pointScore / this.quiz.questions.length;

    this.answersShown = true;
  }

  shareResults(): void {
    this.share.share({
      title: `Check this quiz out!`,
      text: `I scored ${this.pointScore}/${this.quiz.questions.length} on this "${this.quiz.title}" quiz! What can you get?`,
      url: this.document.location.href,
    });
  }
}
