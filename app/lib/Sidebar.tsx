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
        className={`nav-transition w-screen min-w-[100vw] flex-1 bg-primary/60 px-2 pt-2 dark:bg-black md:md:w-52 md:min-w-[14rem] md:max-w-[14rem]`}>
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
    <div className="border-background/10 bg-primary px-4 py-1 text-left dark:border-background dark:bg-black md:my-0">
      <Link
        to={link.to ?? ''}
        className="mt-1 block capitalize no-underline hover:text-primary hover:no-underline">
        {link.name}
      </Link>
    </div>
  );
};

const NavItemWithChild: FC<RouteType> = ({ name, child }) => {
  return (
    <article className="w-screen md:w-52 ">
      <Menu
        as="div"
        className="relative rounded-lg border-background/10 bg-primary py-1 text-left dark:border-background dark:bg-black md:my-0">
        <div>
          <Menu.Button className="text-md inline-flex w-screen justify-between  rounded-md bg-black px-4 pt-1 pb-0 font-medium text-secondary hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-opacity-75  md:w-52">
            {name}
            <ChevronDownIcon className="-mr-1 h-5 w-5 hover:text-primary" aria-hidden="true" />
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
          <Menu.Items className="top-0 left-full z-10 mt-2 w-screen origin-top-right divide-y divide-secondary rounded-r-md bg-black focus:outline-none md:w-52">
            <div className="rounded-lg bg-background/20 p-1">
              {child?.map((link) => (
                <Menu.Item key={link.to}>
                  {({ active }) => (
                    <Link
                      to={link.to}
                      className={`${
                        active ? 'text-primary' : ''
                      }  mt-1 block border-background/10 p-2 pl-6 capitalize text-secondary/80 no-underline hover:text-primary hover:no-underline dark:border-background`}>
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
