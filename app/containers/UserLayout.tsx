import { FC, useEffect, useState } from 'react';
import Footer from '~/components/Footer';
import Header from '~/components/Header';
import { Sidebar } from '~/lib/Sidebar';

const UserLayout: FC = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    sessionStorage.getItem('sidebar') === 'true' && setSidebar(true);
  }, []);

  const handleSidebarToggle = () => {
    sessionStorage.setItem('sidebar', sidebar ? 'false' : 'true');
    setSidebar(!sidebar);
  };

  return (
    <main className="flex min-h-screen w-screen max-w-full flex-col">
      <Header onSidebarChange={handleSidebarToggle} sidebar={sidebar} />
      <main className="flex flex-grow flex-row">
        {<Sidebar show={sidebar} />}
        <section className="nav-transition flex-grow p-2 pb-10">{children}</section>
      </main>
      <Footer />
    </main>
  );
};

export default UserLayout;
