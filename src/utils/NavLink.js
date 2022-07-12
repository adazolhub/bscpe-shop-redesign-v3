import { matchRoutes } from "react-router-dom";
import { Link } from "react-router-dom";
import { Routes } from "react-router-dom";
import { useResolvedPath } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function NavLink({
    to,
    exact,
    className,
    activeClassName,
    inactiveClassName,
    ...rest
}) {
    let location = useLocation();
    let resolvedLocation = useResolvedPath(to);

    // console.log(resolvedLocation);
    let routeMatches = matchRoutes(Routes, location);

    let isActive;

    if (exact) {
        isActive = location.pathname === resolvedLocation.pathname;
    } else {
        isActive = routeMatches.some(
            (match) => match.pathname === resolvedLocation.pathname
        );
    }

    let allClassNames =
        className + (isActive ? ` ${activeClassName}` : ` ${inactiveClassName}`);
    return <Link className={allClassNames} to={to} {...rest} />;
}