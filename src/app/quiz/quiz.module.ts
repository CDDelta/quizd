import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { QuizzesLandingComponent } from './quizzes-landing/quizzes-landing.component';

@NgModule({
  declarations: [QuizDetailComponent, QuizzesLandingComponent],
  imports: [CommonModule],
})
export class QuizModule {}
