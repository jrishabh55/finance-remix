import { TransactionType } from '@prisma/client';
import { Dayjs } from 'dayjs';

export interface StatementUpload {
  transactionDate: Dayjs;
  description: string;
  referenceId: string;
  amount: number;
  type: TransactionType;
}
