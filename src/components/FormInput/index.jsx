import { useState } from "react";

export default function FormInput(props) {
  const [onFocus, setOnFocus] = useState(false);
  const handleFocus = () => {
    console.log(props);
    setOnFocus(true);
  };

  return (
    <input
      onChange={({ target }) => props.callbackChange(target)}
      onBlur={handleFocus}
      focused={onFocus.toString()}
      {...props.attrs}
    />
  );
}
