import { readFileSync } from 'fs';
import path from '~/utils/path';

export function loader() {
  const xlFile = readFileSync(path('assets', 'default.transactions.xls'));
  return new Response(xlFile, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf'
    }
  });
}
