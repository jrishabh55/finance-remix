import { TransactionType } from '@prisma/client';
import dayjs, { Dayjs } from 'dayjs';
import xlsx from 'node-xlsx';

export interface StatementUpload {
  transactionDate: Dayjs;
  description: string;
  referenceId: string;
  amount: number;
  type: TransactionType;
}

const parseHdfcFile = (
  file: string | ArrayBuffer,
  options?: Record<string, any>
): StatementUpload[] => {
  // parse xlsx file
  const [sheet]: any = xlsx.parse(file, options);
  sheet.data.splice(0, 22);

  const data: Array<StatementUpload> = [];
  for (const row of sheet.data) {
    if (row.length === 0 || row[0].includes('*')) {
      break;
    }

    const [DD, MM, YY] = row[0].split('/').map(Number);

    const date = dayjs(new Date(+`20${YY}`, MM, DD));

    if (!date.isValid()) {
      console.log('Invalid', row[0]);
    }

    data.push({
      transactionDate: date,
      description: row[1],
      referenceId: row[2],
      amount: parseFloat(row[5] || row[4]),
      type: row[4] ? 'DEPOSIT' : 'WITHDRAWAL'
    });
  }

  return data;
};

export default parseHdfcFile;
