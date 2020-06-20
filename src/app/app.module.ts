import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { QuizModule } from './quiz/quiz.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateModule } from './create/create.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, QuizModule, CreateModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
