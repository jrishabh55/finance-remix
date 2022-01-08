import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { FC, Fragment } from 'react';
import { Link } from 'remix';
import routes, { RouteType } from '~/routes';

export const Sidebar = () => {
  return (
    <aside
      className={`md:md:w-52 w-screen  w-screen min-w-[100vw] md:min-w-[14rem] md:max-w-[14rem] pt-2 bg-primary/60 dark:bg-black flex-1 px-2 nav-transition`}>
      <section className="space-y-4">
        {routes.map((r) => (
          <NavItem key={r.to} link={r} />
        ))}
      </section>
    </aside>
  );
};

export const NavItem: FC<{ link: RouteType }> = ({ link }) => {
  if ((link.child?.length ?? 0) > 0) {
    return <NavItemWithChild name={link.name} child={link.child} />;
  }

  return (
    <div className="text-center bg-primary dark:bg-black rounded-lg py-2 my-2 md:my-0 shadow shadow-background/10 dark:shadow-background/90 border-b border-background/10 dark:border-background">
      <Link
        to={link.to ?? ''}
        className="block capitalize mt-1 text-gray-800 hover:text-gray-600 no-underline hover:no-underline">
        {link.name}
      </Link>
    </div>
  );
};

const NavItemWithChild: FC<RouteType> = ({ name, child }) => {
  return (
    <article className="md:w-52 w-screen ">
      <Menu
        as="div"
        className="relative text-center bg-primary dark:bg-black rounded-lg py-2 my-1 md:my-0 shadow shadow-background/10 dark:shadow-background/90 border-b border-background/10 dark:border-background">
        <div>
          <Menu.Button className="inline-flex justify-center md:w-52 w-screen  px-4 py-1 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:text-primary hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {name}
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-primary"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute z-10 top-10 right-0 md:w-52 w-screen  mt-2 origin-top-right bg-black divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {child?.map((link) => (
                <Menu.Item key={link.to}>
                  {({ active }) => (
                    <Link
                      to={link.to}
                      className={`${
                        active ? 'text-primary' : ''
                      } flex rounded-b-lg shadow shadow-background items-center w-full px-2 py-2 text-sm`}>
                      {link.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </article>
  );
};
