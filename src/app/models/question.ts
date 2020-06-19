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

export interface MultipleChoiceQuestion extends Question {
  answerChoices: string[];
  correctAnswers: string[];
}

export interface TextQuestion extends Question {
  correctAnswer: string;
  caseSensitive: boolean;
}

export interface NumberQuestion extends Question {
  correctAnswer: number;
}

export interface DateQuestion extends Question {
  correctAnswer: Date;
}
