export enum QuestionType {
  MultipleChoice,
  Text,
  Number,
  Date,
}

export interface Question {
  prompt: string;
  type: QuestionType;
}
