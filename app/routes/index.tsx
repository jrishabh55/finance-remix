import { LoaderFunction, useLoaderData } from 'remix';
import Trends, { TrendsData } from '~/components/charts/Trends';
import { Title } from '~/components/Typography';
import { monthlyTrends, yearlyTrends } from '~/query/charts.server';
import { months } from '~/utils';
import { requireUserId } from '~/utils/session.server';

type LoaderData = { cashflow: TrendsData; profitAndLoss: TrendsData; yearly: TrendsData };

export const loader: LoaderFunction = async ({ request }): Promise<LoaderData | Response> => {
  await requireUserId(request);

  const yearlyTrendsData = await yearlyTrends();
  const monthlyTrendsData = await monthlyTrends();

  const yearly: TrendsData = yearlyTrendsData.map(({ deposit, withdrawal, name }) => {
    const average = deposit - withdrawal;

    return {
      name,
      deposit,
      withdrawal: withdrawal * -1,
      average
    };
  });

  const cashflow: TrendsData = monthlyTrendsData.map(({ deposit, withdrawal, name }) => {
    const average = deposit - withdrawal;
    const month: number = Number(name);

    return {
      name: months[month],
      deposit,
      withdrawal: withdrawal * -1,
      average
    };
  });

  const profitAndLoss = cashflow.map((c) => {
    return {
      name: c.name,
      deposit: c.deposit,
      withdrawal: c.withdrawal * -1
    };
  });

  return { cashflow, profitAndLoss, yearly };
};

export default function Index() {
  const { cashflow, profitAndLoss, yearly } = useLoaderData<LoaderData>();

  return (
    <div className="grid grid-cols-12 md:grid-cols-12 gap-4">
      <div className="grid grid-cols-12 col-span-12">
        <Title>Dashboard</Title>
      </div>
      <div className="col-span-12 md:col-span-2">
        <Trends title="Yearly Comparison" data={yearly} small legend={false} />
      </div>
      <div className="md:col-span-10"></div>
      <div className="col-span-12 md:col-span-6">
        <Trends title="Cashflow" data={cashflow} />
      </div>
      <div className="col-span-12 md:col-span-6">
        <Trends title="Monthly Trends" stack={false} data={profitAndLoss} />
      </div>
    </div>
  );
}
