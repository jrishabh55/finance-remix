import { useLoaderData } from 'remix';
import Trends, { TrendsData } from '~/components/charts/Trends';
import UserLayout from '~/containers/userLayout';
import { months } from '~/utils';

type LoaderData = { data: TrendsData };

export const loader = () => {
  const data: TrendsData = Array(6)
    .fill(0)
    .map((_, i) => ({
      name: months[11 - i],
      deposit: Math.floor(Math.random() * 10000000),
      withdrawal: Math.floor(Math.random() * 10000000)
    }));

  return { data };
};

export default function Index() {
  const { data } = useLoaderData<LoaderData>();

  return (
    <UserLayout>
      <div className="grid grid-cols-2 gap-4">
        <Trends title="Yearly Trend" data={data} />
      </div>
    </UserLayout>
  );
}
