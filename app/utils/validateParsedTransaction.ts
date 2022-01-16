export const validateTransaction = (row: any): boolean => {
  return row.transactionDate.isValid() && row.description && row.amount && row.type;
};
export const validateTransactions = (rows: any[]): boolean => {
  return rows.every(validateTransaction);
};
