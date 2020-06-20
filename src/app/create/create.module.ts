import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CreateComponent } from './create.component';

@NgModule({
  declarations: [CreateComponent],
  imports: [CommonModule, ReactiveFormsModule, DragDropModule],
})
export class CreateModule {}
