import { FC } from 'react';

const Footer: FC = () => {
  return (
    <footer className="fixed bottom-0 right-1/2 translate-x-1/2">
      <div className="flex justify-center">
        <div className="text-center">
          <p className="text-lg text-primary dark:text-secondary">
            Made with <span className="text-red-600">❤</span> by{' '}
            <a href="https://rishabhjain.dev" className="underline">
              Rishabh Jain
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
