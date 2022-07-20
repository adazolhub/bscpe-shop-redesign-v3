function Input({
  type,
  name,
  placeholder,
  icon,
  label = false,
  labelText,
  className,
  setter,
  ...props
}:
  | {
      type: string;
      name?: string;
      placeholder?: string;
      icon?: any;
      label?: boolean;
      labelText?: string;
      className?: string;
      setter?: any;
      defaultValue?: any;
      pattern?: string;
      onChange?: any;
      autoFocus?: any;
      required?: boolean;
    }
  | any) {
  return (
    <>
      {setter ? (
        <input
          type={type}
          className={[
            "text-field border placeholder:text-gray-400 focus:placeholder:text-gray-600 outline-1 font-light focus:outline-black/10 rounded-md px-4 py-3",
            className,
          ].join(" ")}
          name={name}
          placeholder={placeholder}
          {...props}
          onChange={(event) => {
            setter(event.target.value);
          }}
        />
      ) : label ? (
        <label className="flex flex-col text-[0.65em] text-gray-300">
          <p className="ml-1">{labelText}</p>
          <input
            type={type}
            className={[
              "text-field border placeholder:text-gray-400 focus:placeholder:text-gray-600 outline-1 font-light focus:outline-black/10 rounded-md px-4 py-3",
              className,
            ].join(" ")}
            name={name}
            placeholder={placeholder}
            {...props}
          />
        </label>
      ) : (
        <input
          type={type}
          className={[
            "text-field border placeholder:text-gray-400 focus:placeholder:text-gray-600 outline-1 font-light focus:outline-black/10 rounded-md px-4 py-3",
            className,
          ].join(" ")}
          name={name}
          placeholder={placeholder}
          {...props}
        />
      )}
    </>
  );
}

export default Input;
