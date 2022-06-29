import React, { useState } from "react";
import AddItem from "../components/ProductPanel/AddItem";
import RemoveItem from "../components/ProductPanel/RemoveItem";
import { ToggleState, ToggleStateProvider } from "../lib/ToggleState";

const Dashboard = () => {
  let { modalToggleHandler } = ToggleState();
  let [modalToggle, setModalToggle] = useState(false);

  let handleToggle = () => {
    setModalToggle((prev) => !prev);
  };
  return (
    <>
      <div className="min-h-[calc(100vh-6em)] mt-12 mx-3">
        <section>
          <p>Dashboard</p>
          <button
            className="btn-primary"
            onClick={() => modalToggleHandler("test")}
          >
            {" "}
            Add item
          </button>
          <button className="btn-primary" onClick={() => handleToggle("test")}>
            {" "}
            Remove item
          </button>
        </section>
      </div>
      <AddItem />
      <RemoveItem modalToggle={modalToggle} modalToggleHandler={handleToggle} />
    </>
  );
};

export default Dashboard;
