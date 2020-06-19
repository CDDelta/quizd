import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizzesLandingComponent } from './quiz/quizzes-landing/quizzes-landing.component';
import { QuizDetailComponent } from './quiz/quiz-detail/quiz-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: QuizzesLandingComponent,
  },
  {
    path: 'quizzes/:id',
    component: QuizDetailComponent,
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
