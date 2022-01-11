import { useEffect, useState } from 'react';
import DataTable, { createTheme, TableProps } from 'react-data-table-component';
import styles from '~/../styles/table.css';

export function links() {
  return [{ rel: 'stylesheet', href: styles }];
}

export const useDataTableTheme = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    createTheme(
      'customFinance',
      {
        text: {
          primary: '#4ECCA3',
          secondary: '#EEEEEE'
        },
        background: {
          default: 'transparent'
        },
        context: {
          background: '#FF9800',
          text: '#FFFFFF'
        },
        divider: {
          default: '#393E46'
        },
        action: {
          button: '#4ECCA3',
          hover: '#4ECCA3',
          disabled: 'rgba(0,0,0,.12)'
        }
      },
      'dark'
    );
    setLoaded(true);
  }, []);

  return loaded ? 'customFinance' : 'dark';
};

function Table<T>(props: TableProps<T>) {
  const theme = useDataTableTheme();

  return (
    <div id="finance-table">
      <DataTable className="w-full" theme={theme} {...props} />
    </div>
  );
}

export default Table;
