function SubContainer({ title, children }) {
  return (
    <div className="px-4 py-2 my-1 bg-white rounded-md shadow-sm">
      <p className="text-[0.7em] font-thin text-gray-400/70 pb-2">{title}</p>
      {children}
      <div className="flex flex-col text-gray-500"></div>
    </div>
  );
}

export default SubContainer;
