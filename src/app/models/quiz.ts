import { Question } from './question';

export interface Quiz {
  title: string;
  tags: string[];
  description: string;

  paymentPointer?: string;

  questions: Question[];
}
