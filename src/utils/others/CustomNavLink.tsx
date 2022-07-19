import NavLink from "./NavLink";

 function CustomNavLink({ to, onClick, children } : {
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
        activeClassName="bg-gray-700 text-gray-200 shadow"
        inactiveClassName="hover:bg-gray-100 hover:shadow"
        onClick={onClick}
        className="flex items-center justify-between gap-4 px-4 py-4 text-xs transition-colors rounded-md cursor-pointer whitespace-nowrap text-gray-500/80 group"
      >
        {children}
      </NavLink>
    );
  }

  export default CustomNavLink

// import React from 'react'

// const CustomNavLink = () => {
//   return (
//     <div>CustomNavLink</div>
//   )
// }

// export default CustomNavLink