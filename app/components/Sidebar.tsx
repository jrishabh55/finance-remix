import { FC } from 'react';
import { Link } from 'remix';
import routes from '~/routes';

export const Sidebar = () => {
  return (
    <aside
      className={`md:w-56 w-screen min-w-[100vw] md:min-w-[14rem] md:max-w-[14rem] pt-2 bg-primary/60 dark:bg-black flex-1 px-2 nav-transition`}>
      <ul className="space-y-4">
        {routes.map((r) => (
          <NavItem key={r.to} to={r.to}>
            {r.name}
          </NavItem>
        ))}
      </ul>
    </aside>
  );
};

export const NavItem: FC<{ to: string }> = ({ children, to }) => {
  return (
    <li className="text-center bg-primary dark:bg-black rounded-lg py-4 my-2 md:my-0 shadow shadow-background/10 dark:shadow-background/90 border-b border-background/10 dark:border-background">
      <Link
        to={to}
        className="block capitalize mt-1 text-gray-800 hover:text-gray-600 no-underline hover:no-underline">
        {children}
      </Link>
    </li>
  );
};
