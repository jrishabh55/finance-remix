import { FC } from 'react';
import Footer from '~/components/Footer';

const UnAuthenticatedLayout: FC = ({ children }) => {
  return (
    <main className="flex min-h-screen w-screen max-w-full flex-col">
      <main className="flex flex-grow flex-row">
        <section className="nav-transition flex-grow p-2">{children}</section>
        <Footer />
      </main>
    </main>
  );
};

export default UnAuthenticatedLayout;
