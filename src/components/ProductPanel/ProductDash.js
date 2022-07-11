import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { NavLink } from "../../pages/Home";

const ProductDash = () => {
  return (
    <div className="grid grid-cols-6 gap-2">
      <div className="col-span-1 ">
        <p>Users: </p>
        {[...Array(5).keys()].map((index) => (
          <div key={index}>
            <NavLink
              to={`${index}`}
              activeClassName="text-gray-600"
              inactiveClassName="text-gray-400 hover:text-gray-500"
            >
              {" "}
              User {index}{" "}
            </NavLink>
          </div>
        ))}
      </div>

      <Outlet />
    </div>
  );
};

export const ProductItem = () => {
  let params = useParams();
  return (
    <div className="grid col-span-5 p-2 font-bold text-gray-600 border border-gray-300 border-dashed rounded-md place-content-center">
      {" "}
      User {params.id} details
    </div>
  );
};

export default ProductDash;
