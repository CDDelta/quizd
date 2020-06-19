import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  public quizForm = this.fb.group({
    title: ['', Validators.required],
    questions: this.fb.array([]),
  });

  get quizQuestions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  addQuestion(): void {
    const questions = this.quizForm.get('questions') as FormArray;
    questions.push(
      this.fb.group({
        type: [''],
      }),
    );
  }
}
