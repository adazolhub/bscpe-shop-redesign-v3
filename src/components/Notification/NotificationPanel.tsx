import { BellIcon } from "@heroicons/react/outline";

const NotificationPanel = () => {
  return (
    <div className="grid place-content-center min-h-[calc(30vh)]">
      <div className="grid place-items-center">
        <BellIcon className="w-20 h-20 text-gray-400 stroke-1" />
        <p className="text-gray-300">You have no notifications yet</p>
        <div></div>
      </div>
    </div>
  );
};

export default NotificationPanel;
