import { FC, useState } from 'react';
import Header from '~/components/Header';
import { Sidebar } from '~/components/Sidebar';

const UserLayout: FC = ({ children }) => {
  const [sidebar, setSidebar] = useState(true);

  return (
    <main className="flex flex-col h-screen w-screen max-w-[100vw]">
      <Header onSidebarChange={() => setSidebar(!sidebar)} sidebar={sidebar} />
      <main className="flex flex-row flex-grow">
        {sidebar && <Sidebar />}
        <section className="flex-grow nav-transition p-2">{children}</section>
        <footer className="fixed bottom-0 right-1/2 translate-x-1/2">
          <div className="flex justify-center">
            <div className="text-center">
              <p className="dark:text-secondary text-primary text-lg">
                Made with <span className="text-red-600">❤</span> by{' '}
                <a href="https://rishabhjain.dev" className="underline">
                  Rishabh Jain
                </a>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </main>
  );
};

export default UserLayout;
