function Input({
  type,
  name,
  placeholder,
  icon,
  className,
  setter,
  ...props
}: {
  type: string;
  name?: string;
  placeholder?: string;
  icon?: any;
  className?: string;
  setter?: any;
  defaultValue?: any;
  pattern?: string;
  onChange?: any;
  autoFocus?: any;
  required?: boolean;
}) {
  return (
    <>
      {setter ? (
        <input
          type={type}
          className={["text-field placeholder:text-gray-300 ", className].join(
            " "
          )}
          name={name}
          placeholder={placeholder}
          {...props}
          onChange={(event) => {
            setter(event.target.value);
          }}
        />
      ) : (
        <input
          type={type}
          className={["text-field placeholder:text-gray-300 ", className].join(
            " "
          )}
          name={name}
          placeholder={placeholder}
          {...props}
        />
      )}
    </>
  );
}

export default Input;
