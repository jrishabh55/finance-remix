import { LoaderFunction, useLoaderData } from 'remix';
import AccountList from '~/components/accounts/List';
import Cashflow, { CashflowData } from '~/components/charts/Cashflow';
import MonthlyTrends from '~/components/charts/MonthlyTrends';
import { TrendsData } from '~/components/charts/Trends';
import Card from '~/lib/Card';
import { getAccountsWithSum, GetAccountsWithSum } from '~/query/accounts.server';
import { monthlyTrends } from '~/query/charts.server';
import { months } from '~/utils';
import { requireUserId } from '~/utils/session.server';

type LoaderData = {
  cashflow: CashflowData;
  monthlyTrends: TrendsData;
  yearly?: TrendsData;
  accountsWithSum: Awaited<ReturnType<GetAccountsWithSum>>;
};

export const loader: LoaderFunction = async ({ request }): Promise<LoaderData | Response> => {
  const userId = await requireUserId(request);

  // const yearlyTrendsData = await yearlyTrends();
  const [monthlyTrendsData, accountsWithSum] = await Promise.all([
    monthlyTrends({ year: new Date().getFullYear(), userId }),
    getAccountsWithSum(userId)
  ]);

  // const yearly: TrendsData = yearlyTrendsData.map(({ deposit, withdrawal, name }) => {
  //   const average = deposit - withdrawal;

  //   return {
  //     name,
  //     deposit,
  //     withdrawal: withdrawal * -1,
  //     average
  //   };
  // });

  const cashflow: CashflowData = monthlyTrendsData.map(({ deposit, withdrawal, name }) => {
    const average = deposit - withdrawal;
    const month: number = Number(name);

    return {
      name: months[month],
      inflow: deposit,
      outflow: withdrawal * -1,
      'net-change': average
    };
  });

  const parsedMonthlyTrendsData = monthlyTrendsData.map((c) => {
    const month: number = Number(c.name);
    return {
      name: months[month],
      deposit: c.deposit,
      withdrawal: c.withdrawal
    };
  });

  return { cashflow, monthlyTrends: parsedMonthlyTrendsData, accountsWithSum };
};

export default function Index() {
  const { cashflow, monthlyTrends, accountsWithSum } = useLoaderData<LoaderData>();

  return (
    <section className="grid gap-4 md:grid-cols-12">
      <article className="col-span-6">
        <Card className="flex-grow" collapsible title="Accounts">
          <AccountList accounts={accountsWithSum} />
        </Card>
      </article>
      {/* <article className="col-span-6">
          <Trends title="Yearly Comparison" data={yearly} small legend={false} />
        </article> */}
      <article className="col-span-6">
        <MonthlyTrends deposit={false} title="Expenses" data={monthlyTrends} />
      </article>
      <article className="col-span-6">
        <Card title="Working">Accounts</Card>
      </article>
      <article className="col-span-6">
        <Cashflow title="Cashflow" data={cashflow} />
      </article>
      <article className="col-span-6">
        <Card title="Working">Accounts</Card>
      </article>
      <article className="col-span-6">
        <MonthlyTrends title="Monthly Trends" data={monthlyTrends} />
      </article>
    </section>
  );
}
