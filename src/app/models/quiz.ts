import {
  MultipleChoiceQuestion,
  TextQuestion,
  NumberQuestion,
  DateQuestion,
} from './question';

export interface Quiz {
  title: string;
  tags: string[];
  description: string;

  paymentPointer?: string;

  questions:
    | MultipleChoiceQuestion[]
    | TextQuestion[]
    | NumberQuestion[]
    | DateQuestion[];
}
