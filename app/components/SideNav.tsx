import { FC, useState } from 'react';
import { Link } from 'remix';

export default function Navbar() {
  // create a sidebar
  const [sidebar, setSidebar] = useState(false);
  return <nav className="flex flex-row"></nav>;
}

export const NavItem: FC<{ to: string }> = ({ children, to }) => {
  return (
    <Link className="p-2" to={to}>
      {children}
    </Link>
  );
};
