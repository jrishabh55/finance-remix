import { FC } from 'react';
import { Link } from 'remix';

const Header: FC<{ onSidebarChange: () => void; sidebar: boolean }> = ({
  onSidebarChange,
  sidebar
}) => {
  return (
    <header className="flex flex-col bg-black shadow-xl border border-black">
      <div className={`pt-2`}>
        <div className="flex flex-col flex-1 max-w-xs w-full pt-5 pb-4 px-6 md:pt-0">
          <div className="flex items-center space-x-3 px-2">
            <Link
              to="/"
              className="flex items-center no-underline font-bold text-2xl text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600">
              <img
                src="https://avatars.githubusercontent.com/u/18290665?v=4"
                alt="logo"
                className="h-12 rounded-full"
              />
              <span className="ml-2">Finance RJ</span>
            </Link>
            <button
              className="flex items-center no-underline text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              onClick={onSidebarChange}>
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                {!sidebar ? (
                  <>
                    <line x1="4" y1="6" x2="20" y2="6"></line>
                    <line x1="4" y1="12" x2="20" y2="12"></line>
                    <line x1="4" y1="18" x2="20" y2="18"></line>
                  </>
                ) : (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
