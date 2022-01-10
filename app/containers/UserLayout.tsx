import { FC, useState } from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { Sidebar } from '~/components/Sidebar';

const UserLayout: FC = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <main className="flex flex-col min-h-screen w-screen max-w-full">
      <Header onSidebarChange={() => setSidebar(!sidebar)} sidebar={sidebar} />
      <main className="flex flex-row flex-grow">
        {sidebar && <Sidebar />}
        <section className="flex-grow nav-transition p-2 pb-10">{children}</section>
      </main>
      <Footer />
    </main>
  );
};

export default UserLayout;
