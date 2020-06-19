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

  async publishQuiz(quiz: Quiz, key: JWKInterface): Promise<void> {
    let transaction = await this.arweaveClient.createTransaction(
      {
        data: JSON.stringify(quiz),
      },
      key,
    );

    transaction.addTag('Content-Type', 'application/json');

    await this.arweaveClient.transactions.sign(transaction, key);

    await this.arweaveClient.transactions.post(transaction);
  }
}
