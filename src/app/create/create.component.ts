import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent {
  public quizForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
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
        type: ['', Validators.required],
        prompt: ['', Validators.required],
      }),
    );
  }

  moveQuestion(event: CdkDragDrop<FormGroup>) {
    moveItemInArray(
      this.quizQuestions.controls,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
