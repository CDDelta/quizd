export enum QuestionType {
  MultipleChoice = 'mc',
  Text = 'txt',
  Number = 'num',
  Date = 'date',
}

export interface Question {
  prompt: string;
  type: QuestionType;
}
