import {
  ArrowNarrowRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";
import { UserIcon, ViewGridIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StaticState } from "../../../types";
import { ToggleState } from "../../../utils/lib/ToggleState";

const Dropdown = () => {
  const { toggleState, toggleStateHandler } = ToggleState() as StaticState;
  const [toggle, setToggle] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (!toggleState["hamburger_mobile"]) {
      setToggle(false);
    }

    return () => {
      setToggle(false);
    };
  }, [toggleState["hamburger_mobile"]]);
  const toggleHandler = () => {
    setToggle(!toggle);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleHandler}
        className={`${
          toggle ? "bg-gray-200" : "hover:bg-gray-100 hover:shadow"
        } inline-flex items-center justify-between px-4 py-4 rounded w-full rounded-b-none`}
      >
        <span className="inline-flex gap-4">
          <ViewGridIcon />
          Categories
        </span>
        <span>
          <ChevronDownIcon
            className={`${
              toggle ? "-rotate-180" : "rotate-0"
            } transform-gpu transition-transform duration-500`}
          />
        </span>
      </button>
      <div
        className={`${
          toggle ? "h-[calc(152px)] bg-gray-200/60 shadow rounded-b" : "h-0 "
        } flex flex-col gap-2 overflow-hidden relative -mt-1  transform-gpu transition-all duration-500 pl-6`}
      >
        <button
          onClick={() => {
            toggleStateHandler("hamburger_mobile");
            navigate("/0");
            setToggle(false);
          }}
          className="inline-flex items-center justify-start gap-4 px-4 py-2 rounded"
        >
          <span>
            <ArrowNarrowRightIcon />
          </span>
          Men
        </button>
        <button
          onClick={() => {
            toggleStateHandler("hamburger_mobile");
            navigate("/1");
            setToggle(false);
          }}
          className="inline-flex items-center justify-start gap-4 px-4 py-2 rounded"
        >
          <span>
            <ArrowNarrowRightIcon />
          </span>
          Women
        </button>
        <button
          onClick={() => {
            toggleStateHandler("hamburger_mobile");
            navigate("/2");
            setToggle(false);
          }}
          className="inline-flex items-center justify-start gap-4 px-4 py-2 rounded"
        >
          <span>
            <ArrowNarrowRightIcon />
          </span>
          Kids
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
