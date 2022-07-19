import NavLink from "./NavLink";

function CustomNavLink({
  to,
  onClick,
  children,
}: {
  to: string;
  activeClassName?: string;
  inactiveClassName?: string;
  className?: string;
  onClick?: () => void;
  children?: JSX.Element | JSX.Element[];
}) {
  return (
    <NavLink
      to={to?.toLowerCase()}
      activeClassName="text-white bg-black !important"
      inactiveClassName="hover:bg-gray-100 hover:shadow"
      onClick={onClick}
      className="inline-flex items-center justify-between px-4 py-4 rounded"
    >
      {children}
    </NavLink>
  );
}

export default CustomNavLink;

// import React from 'react'

// const CustomNavLink = () => {
//   return (
//     <div>CustomNavLink</div>
//   )
// }

// export default CustomNavLink
