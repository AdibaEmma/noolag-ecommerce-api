import {transactionsConstants} from '@app/constants';
import {Transaction} from '@app/entities';

export const transactionsProviders = [
  {
    provide: transactionsConstants.transactions_repository,
    useValue: Transaction,
  },
];
