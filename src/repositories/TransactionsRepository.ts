import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = this.transactions.reduce(
      (prevValue: Balance, transaction: Transaction) => {
        console.log(transaction);
        return {
          ...prevValue,
          income:
            prevValue.income +
            (transaction.type === 'income' ? transaction.value : 0),
          outcome:
            prevValue.outcome +
            (transaction.type === 'outcome' ? transaction.value : 0),
          total:
            prevValue.total +
            (transaction.type === 'income'
              ? transaction.value
              : -transaction.value),
        };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, type, value }: CreateDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
