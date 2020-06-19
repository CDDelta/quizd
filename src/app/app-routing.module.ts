import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizzesLandingComponent } from './quiz/quizzes-landing/quizzes-landing.component';
import { QuizDetailComponent } from './quiz/quiz-detail/quiz-detail.component';
import { QuizStatusComponent } from './quiz/quiz-status/quiz-status.component';
import { QuizDetailResolverService } from './quiz/quiz-detail/quiz-detail-resolver.service';

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
    loadChildren: () =>
      import('./create/create.module').then((m) => m.CreateModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
