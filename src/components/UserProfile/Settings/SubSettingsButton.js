function SubSettingsButton({
  value,
  name,
  editable = false,
  modifier,
  ...props
}) {
  return (
    <div className="flex items-center justify-between gap-12 py-2 text-xs">
      <div>
        <p className={`${!editable && "opacity-40"}  text-[0.92em]`}>{value}</p>
        <p className="text-[0.8em] text-gray-400/80">{name}</p>
      </div>
      {editable && modifier && (
        <button
          className="px-2 text-[0.8em] py-1 whitespace-nowrap font-medium bg-transparent border border-dashed border-gray-300 text-gray-500 rounded-md "
          {...props}
        >
          {modifier}
        </button>
      )}
    </div>
  );
}

export default SubSettingsButton;
