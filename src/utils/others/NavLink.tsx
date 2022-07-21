import { Link, matchRoutes, useLocation, useResolvedPath } from "react-router-dom";
import { routes } from "../../routes/RouterMain";

interface Navigation {
    to : string,
    exact? : boolean,
    className? : string,
    activeClassName? : string,
    inactiveClassName? : string,
    children?: any;
    onClick?: () => void
  }

 function NavLink({
    to,
    exact,
    className,
    activeClassName,
    inactiveClassName,
    ...rest
  } : Navigation) {
    let location = useLocation();
    let resolvedLocation = useResolvedPath(to);
  
    // console.log(resolvedLocation);
    let routeMatches = matchRoutes(routes, location);
  
    let isActive;
  
    if (exact) {
      isActive = location.pathname === resolvedLocation.pathname;
    } else {
      isActive = routeMatches?.some(
        (match) => match.pathname === resolvedLocation.pathname
      );
    }
  
    let allClassNames =
      className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);
    return <Link className={allClassNames} to={to} {...rest} />;
}


export default NavLink