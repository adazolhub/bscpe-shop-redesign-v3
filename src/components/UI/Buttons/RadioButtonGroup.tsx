interface Radio {
  className?: string;
  option?: string;
  activeClass?: string;
  label?: string;
}

interface Button {
  values?: any[];
  value?: Radio;
  selectedOption: string | undefined;
  setSelectedOption: any;
  children?: JSX.Element | JSX.Element[] | null;
  type?: string;
}

const RadioButtonGroup = ({
  values,
  selectedOption,
  setSelectedOption,
  children,
  type = "",
}: Button) => {
  let handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };
  return (
    <>
      {values?.map((value: Radio) => (
        <div key={value?.option}>
          <label>
            <input
              type="radio"
              name="radio-group"
              value={value?.option}
              defaultChecked={selectedOption === value?.option}
              onClick={handleOptionChange}
              className="hidden"
            />
            {type.toLowerCase() === "color" ? (
              <Color value={value} selectedOption={selectedOption} />
            ) : type.toLowerCase() === "size" ? (
              <Size value={value} selectedOption={selectedOption} />
            ) : (
              children
            )}
          </label>
        </div>
      ))}
    </>
  );
};

const Color = ({
  selectedOption,
  value,
}: {
  selectedOption: string | undefined;
  value: Radio;
}) => {
  return (
    <>
      <div
        className={[
          value.className,
          selectedOption === value.option && value.activeClass,
        ].join(" ")}
      />
    </>
  );
};

const Size = ({
  selectedOption,
  value,
}: {
  selectedOption: string | undefined;
  value: Radio;
}) => {
  return (
    <div
      className={[
        value.className,
        selectedOption === value.option && value.activeClass,
      ].join(" ")}
    >
      <p>{value.label}</p>
    </div>
  );
};

export default RadioButtonGroup;
