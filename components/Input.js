import classNames from "classnames";
import { useState } from "react";

export const Input = ({ placeholder, onInput, value: v, type }) => {
  const [value, setValue] = useState(v || "");
  return (
    <div className={classNames("inputContainer", value !== "" && "filled")}>
      <input
        className="Input"
        onInput={(i) => {
          onInput(i.target.value), setValue(i.target.value);
        }}
        value={value}
        type={type || "text"}
      />
      <label className="InputLabel">{placeholder}</label>
    </div>
  );
};
