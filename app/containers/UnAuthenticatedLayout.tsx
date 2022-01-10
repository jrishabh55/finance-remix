import { FC } from 'react';
import Footer from '~/components/Footer';

const UnAuthenticatedLayout: FC = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen w-screen max-w-full">
      <main className="flex flex-row flex-grow">
        <section className="flex-grow nav-transition p-2">{children}</section>
        <Footer />
      </main>
    </main>
  );
};

export default UnAuthenticatedLayout;
