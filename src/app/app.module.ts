import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuizModule } from './quiz/quiz.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, QuizModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
