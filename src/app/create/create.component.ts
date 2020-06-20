import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { QuizService } from '../services/quiz.service';
import { Quiz } from '../models/quiz';
import {
  Question,
  TextQuestion,
  NumberQuestion,
  DateQuestion,
  MultipleChoiceQuestion,
} from '../models/question';
import { JWKInterface } from 'arweave/web/lib/wallet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  public key: JWKInterface;

  public quizForm = this.fb.group({
    title: ['', Validators.required],
    tags: [''],
    description: ['', Validators.required],
    paymentPointer: [''],
    questions: this.fb.array([], Validators.required),
  });

  public publishingQuiz = false;

  get quizQuestions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  constructor(
    private quizService: QuizService,
    private fb: FormBuilder,
    private router: Router,
  ) {}

  addQuestion(): void {
    const questions = this.quizForm.get('questions') as FormArray;
    questions.push(
      this.fb.group({
        prompt: ['', Validators.required],
        type: ['', Validators.required],
        correctAnswer: [''],
        answerChoices: this.fb.array(
          Array(4)
            .fill(0)
            .map(() =>
              this.fb.group({
                content: [''],
                correctAnswer: [false],
              }),
            ),
        ),
        caseSensitive: [false],
      }),
    );
  }

  moveQuestion(event: CdkDragDrop<FormGroup>): void {
    moveItemInArray(
      this.quizQuestions.controls,
      event.previousIndex,
      event.currentIndex,
    );
  }

  removeQuestion(i: number): void {
    this.quizQuestions.controls.splice(i, 1);
  }

  async publishQuiz(): Promise<void> {
    if (this.quizForm.invalid) return;

    const formValue = this.quizForm.value;

    const quiz: Quiz = {
      title: formValue.title,
      tags: (formValue.tags as string).split(',').map((t) => t.trim()),
      description: formValue.description,
      paymentPointer: formValue.paymentPointer,

      questions: formValue.questions.map((rq) => {
        const q: Question = {
          prompt: rq.prompt,
          type: rq.type,
        };

        switch (q.type) {
          case 'mc':
            const mcq = q as MultipleChoiceQuestion;
            mcq.answerChoices = rq.answerChoices.map((c) => c.content);
            mcq.correctAnswers = rq.answerChoices
              .filter((c) => c.correctAnswer)
              .map((c) => c.content);
            break;
          case 'txt':
            const tq = q as TextQuestion;
            tq.correctAnswer = rq.correctAnswer;
            tq.caseSensitive = rq.caseSensitive;
            break;
          case 'num':
            const nq = q as NumberQuestion;
            nq.correctAnswer = parseFloat(rq.correctAnswer);
            break;
          case 'date':
            const dq = q as DateQuestion;
            dq.correctAnswer = new Date(rq.correctAnswer);
            break;
        }

        return q;
      }),
    };

    this.publishingQuiz = true;

    const quizId = await this.quizService.publishQuiz(quiz, this.key);
    this.router.navigateByUrl(`/quizzes/${quizId}/status`);
  }

  async handleKeyFile(files: FileList): Promise<void> {
    this.key = JSON.parse(await files.item(0).text());
  }
}
