import { Injectable } from '@angular/core';
import { Quiz } from '../models/quiz';
import Arweave from 'arweave/web';
import { JWKInterface } from 'arweave/web/lib/wallet';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private arweaveClient: Arweave;

  constructor() {
    this.arweaveClient = Arweave.init(undefined);
  }

  async getQuizIds(): Promise<string[]> {
    return this.arweaveClient.arql({
      op: 'and',
      expr1: {
        op: 'equals',
        expr1: 'App-Name',
        expr2: 'quizd',
      },
      expr2: {
        op: 'equals',
        expr1: 'Type',
        expr2: 'quiz',
      },
    });
  }

  async getQuiz(quizId: string): Promise<Quiz> {
    const quizJson = (await this.arweaveClient.transactions.getData(quizId, {
      decode: true,
      string: true,
    })) as string;

    const quiz = JSON.parse(quizJson);

    for (const question of quiz.questions) {
      // Parse the answer date for the model.
      if (question.type === 'date')
        question.correctAnswer = new Date(question.correctAnswer);
    }

    return quiz;
  }

  async publishQuiz(quiz: Quiz, key: JWKInterface): Promise<string> {
    let transaction = await this.arweaveClient.createTransaction(
      {
        data: JSON.stringify(quiz),
      },
      key,
    );

    transaction.addTag('Content-Type', 'application/json');
    transaction.addTag('App-Name', 'quizd');
    transaction.addTag('Type', 'quiz');

    await this.arweaveClient.transactions.sign(transaction, key);

    await this.arweaveClient.transactions.post(transaction);

    return transaction.id;
  }

  async getQuizPublishStatus(quizId: string): Promise<boolean> {
    const statusRes = await this.arweaveClient.transactions.getStatus(quizId);
    return statusRes.status === 200;
  }
}
