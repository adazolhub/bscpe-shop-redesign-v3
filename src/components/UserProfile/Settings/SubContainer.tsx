function SubContainer({
  title,
  editable,
  modifier,
  children,
  ...props
}: {
  title?: string;
  editable?: boolean;
  modifier?: JSX.Element | JSX.Element[] | string;
  children?: any;
}) {
  return (
    <div className="px-4 py-2 bg-white rounded-md shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[0.7em] font-thin text-gray-400/70 pb-2">{title}</p>
        {editable && modifier && (
          <button
            className="px-2 text-[0.6em] py-1 whitespace-nowrap font-medium bg-transparent border border-dashed border-gray-300 text-gray-500 rounded-md "
            {...props}
          >
            {modifier}
          </button>
        )}
      </div>
      {children}
      <div className="flex flex-col text-gray-500"></div>
    </div>
  );
}

export default SubContainer;
