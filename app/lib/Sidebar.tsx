import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { FC, Fragment } from 'react';
import { Link } from 'remix';
import routes, { RouteType } from '~/routes';

export const Sidebar: FC<{ show?: boolean }> = ({ show = true }) => {
  return (
    <Transition
      as={Fragment}
      show={show}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 left-[-1000px]"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 left-[-1000px]">
      <aside
        className={`md:md:w-52 w-screen min-w-[100vw] md:min-w-[14rem] md:max-w-[14rem] pt-2 bg-primary/60 dark:bg-black flex-1 px-2 nav-transition`}>
        <section className="space-y-4">
          {routes.map((r) => (
            <NavItem key={r.name} link={r} />
          ))}
        </section>
      </aside>
    </Transition>
  );
};

export const NavItem: FC<{ link: RouteType }> = ({ link }) => {
  if ((link.child?.length ?? 0) > 0) {
    return <NavItemWithChild name={link.name} child={link.child} />;
  }

  return (
    <div className="text-left bg-primary dark:bg-black px-4 py-1 md:my-0 border-background/10 dark:border-background">
      <Link
        to={link.to ?? ''}
        className="block capitalize mt-1 no-underline hover:text-primary hover:no-underline">
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
        className="relative text-left bg-primary dark:bg-black rounded-lg py-1 md:my-0 border-background/10 dark:border-background">
        <div>
          <Menu.Button className="inline-flex justify-between md:w-52 w-screen  px-4 pt-1 pb-0 text-md font-medium text-secondary bg-black rounded-md hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary  focus-visible:ring-opacity-75">
            {name}
            <ChevronDownIcon className="w-5 h-5 -mr-1 hover:text-primary" aria-hidden="true" />
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
          <Menu.Items className="z-10 top-0 left-full md:w-52 w-screen mt-2 origin-top-right bg-black divide-y divide-secondary rounded-r-md focus:outline-none">
            <div className="p-1 rounded-lg bg-background/20">
              {child?.map((link) => (
                <Menu.Item key={link.to}>
                  {({ active }) => (
                    <Link
                      to={link.to}
                      className={`${
                        active ? 'text-primary' : ''
                      }  p-2 pl-6 block capitalize mt-1 text-secondary/80 hover:text-primary no-underline hover:no-underline border-background/10 dark:border-background`}>
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
