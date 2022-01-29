import { LoaderFunction, useLoaderData } from 'remix';
import Cashflow, { CashflowData } from '~/components/charts/Cashflow';
import MonthlyTrends from '~/components/charts/MonthlyTrends';
import Trends, { TrendsData } from '~/components/charts/Trends';
import { GridHeader } from '~/components/GridHeader';
import { Title } from '~/lib/Typography';
import { monthlyTrends, yearlyTrends } from '~/query/charts.server';
import { months } from '~/utils';
import { requireUserId } from '~/utils/session.server';

type LoaderData = { cashflow: CashflowData; monthlyTrends: TrendsData; yearly: TrendsData };

export const loader: LoaderFunction = async ({ request }): Promise<LoaderData | Response> => {
  await requireUserId(request);

  const yearlyTrendsData = await yearlyTrends();
  const monthlyTrendsData = await monthlyTrends({ year: new Date().getFullYear() });

  const yearly: TrendsData = yearlyTrendsData.map(({ deposit, withdrawal, name }) => {
    const average = deposit - withdrawal;

    return {
      name,
      deposit,
      withdrawal: withdrawal * -1,
      average
    };
  });

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

  return { cashflow, monthlyTrends: parsedMonthlyTrendsData, yearly };
};

export default function Index() {
  const { cashflow, monthlyTrends, yearly } = useLoaderData<LoaderData>();

  return (
    <section className="grid grid-cols-12 gap-4 md:grid-cols-12">
      <GridHeader title="Dashboard">
        <Title type="page-header">mjisaudg</Title>
      </GridHeader>
      <article className="col-span-12 md:col-span-2">
        <Trends title="Yearly Comparison" data={yearly} small legend={false} />
      </article>
      <article className="col-span-12 md:col-span-6 md:col-start-7">
        <MonthlyTrends deposit={false} title="Expenses" data={monthlyTrends} />
      </article>
      <article className="col-span-12 md:col-span-6">
        <Cashflow title="Cashflow" data={cashflow} />
      </article>
      <article className="col-span-12 md:col-span-6">
        <MonthlyTrends title="Monthly Trends" data={monthlyTrends} />
      </article>
    </section>
  );
}
