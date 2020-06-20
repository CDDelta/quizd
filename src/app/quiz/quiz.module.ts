import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { QuizzesLandingComponent } from './quizzes-landing/quizzes-landing.component';
import { QuizStatusComponent } from './quiz-status/quiz-status.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    QuizDetailComponent,
    QuizzesLandingComponent,
    QuizStatusComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class QuizModule {}
