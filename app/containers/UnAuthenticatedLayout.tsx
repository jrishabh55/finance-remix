import { FC } from 'react';

const UnAuthenticatedLayout: FC = ({ children }) => {
  return (
    <main className="flex flex-col min-h-screen w-screen max-w-full">
      <main className="flex flex-row flex-grow">
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

export default UnAuthenticatedLayout;
