import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizzesLandingComponent } from './quiz/quizzes-landing/quizzes-landing.component';
import { QuizDetailComponent } from './quiz/quiz-detail/quiz-detail.component';
import { QuizStatusComponent } from './quiz/quiz-status/quiz-status.component';
import { QuizDetailResolverService } from './quiz/quiz-detail/quiz-detail-resolver.service';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: QuizzesLandingComponent,
  },
  {
    path: 'quizzes/:quizId',
    component: QuizDetailComponent,
    resolve: {
      quiz: QuizDetailResolverService,
    },
  },
  {
    path: 'quizzes/:quizId/status',
    component: QuizStatusComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
