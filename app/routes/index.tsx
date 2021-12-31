import dayjs from 'dayjs';
import { useLoaderData } from 'remix';
import Trends, { TrendsData } from '~/components/charts/Trends';
import UserLayout from '~/containers/UserLayout';
import { months, randomNumber } from '~/utils';

type LoaderData = { dataMonthly: TrendsData; yearly: TrendsData };

export const loader = () => {
  const dataMonthly: TrendsData = Array(12)
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

  return { dataMonthly, yearly };
};

export default function Index() {
  const { dataMonthly, yearly } = useLoaderData<LoaderData>();

  return (
    <UserLayout>
      <div className="grid grid-cols-12 md:grid-cols-12 gap-4">
        <div className="col-span-2">
          <Trends title="Yearly Comparison" data={yearly} small legend={false} />
        </div>
        <div className="col-span-12">
          <Trends title="Cash Flow" data={dataMonthly} />
        </div>
        <div className="col-span-12">
          <Trends title="Monthly Trends" type="line" data={dataMonthly} />
        </div>
      </div>
    </UserLayout>
  );
}
