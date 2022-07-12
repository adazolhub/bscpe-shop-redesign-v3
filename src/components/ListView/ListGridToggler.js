import {
  ViewBoardsIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import React from "react";
import { ToggleState } from "../../lib/ToggleState";

const ListGridToggler = () => {
  let { toggleListGrid: toggleList, handleToggleListGrid: handleToggleList } =
    ToggleState();
  return (
    <div className="inline-flex justify-end w-full px-2 pb-3 mt-2 text-gray-400 select-none">
      <button className="inline-flex transition-all" onClick={handleToggleList}>
        <ViewGridIcon
          className={
            toggleList
              ? "w-4 h-4 transition-all delay-200"
              : "w-4 h-4 text-gray-100 bg-gray-500 rounded-sm transition-all delay-200"
          }
        />
        <ViewBoardsIcon
          className={
            toggleList
              ? "rotate-90 w-4 h-4 text-gray-100 bg-gray-500 rounded-sm transition-all delay-200"
              : "rotate-90 w-4 h-4 transition-all delay-200"
          }
        />
      </button>
    </div>
  );
};

export default ListGridToggler;
