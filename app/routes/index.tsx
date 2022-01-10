import dayjs from 'dayjs';
import { LoaderFunction, useLoaderData } from 'remix';
import Trends, { TrendsData } from '~/components/charts/Trends';
import { Title } from '~/components/Typography';
import UserLayout from '~/containers/UserLayout';
import { months, randomNumber } from '~/utils';
import { requireUserId } from '~/utils/session.server';

type LoaderData = { cashflow: TrendsData; profitAndLoss: TrendsData; yearly: TrendsData };

export const loader: LoaderFunction = async ({ request }): Promise<LoaderData | Response> => {
  await requireUserId(request);
  const cashflow: TrendsData = Array(12)
    .fill(0)
    .map((_, i) => {
      const deposit = randomNumber(1, 200000);
      const withdrawal = -randomNumber(1, 200000);
      const average = deposit + withdrawal;

      return {
        name: months[11 - i],
        deposit,
        withdrawal,
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

  const yearly: TrendsData = Array(2)
    .fill(0)
    .map((_, i) => {
      const deposit = randomNumber(1000000, 5000000);
      const withdrawal = -randomNumber(1000000, 5000000);
      const average = deposit + withdrawal;

      return {
        name: dayjs().subtract(i, 'year').format('YYYY'),
        deposit,
        withdrawal,
        average
      };
    });

  return { cashflow, profitAndLoss, yearly };
};

export default function Index() {
  const { cashflow, profitAndLoss, yearly } = useLoaderData<LoaderData>();

  return (
    <UserLayout>
      <div className="grid grid-cols-12 md:grid-cols-12 gap-4">
        <div className="grid grid-cols-12 col-span-12">
          <Title>Dashboard</Title>
        </div>
        <div className="col-span-2">
          <Trends title="Yearly Comparison" data={yearly} small legend={false} />
        </div>
        <div className="col-span-10"></div>
        <div className="col-span-6">
          <Trends title="Cash Flow" data={cashflow} />
        </div>
        <div className="col-span-6">
          <Trends title="Monthly Trends" stack={false} data={profitAndLoss} />
        </div>
      </div>
    </UserLayout>
  );
}
