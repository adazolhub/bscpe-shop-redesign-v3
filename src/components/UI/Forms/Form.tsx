function Form({
  error,
  children,
  ...props
}: {
  error?: string;
  children?: any;
  onClick?: any;
}) {
  return (
    <>
      <form className="flex flex-col" {...props}>
        <div className="flex flex-col gap-1">{children}</div>
      </form>
    </>
  );
}

export default Form;
