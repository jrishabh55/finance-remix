import { FC, useState } from 'react';
import Header from '~/components/Header';
import { Sidebar } from '~/components/Sidebar';

const UserLayout: FC = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <main className="flex flex-col h-screen w-screen">
      <Header onSidebarChange={() => setSidebar(!sidebar)} sidebar={sidebar} />
      <main className="flex flex-row flex-grow">
        {sidebar && <Sidebar />}
        <section className="flex-grow nav-transition p-2">{children}</section>
      </main>
    </main>
  );
};

export default UserLayout;
