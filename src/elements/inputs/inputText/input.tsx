import { FC } from "react";
import styles from "./input.module.scss";

interface InputProps {
  message?: string;
  inputType: string;
  value: string | number;
  name?: string;
  inputPlaceHolder?: string;
  onChange: (value: string, name?: string) => void;
}

const Input: FC<InputProps> = ({ message, name, inputType, value, inputPlaceHolder, onChange }) => {
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const inputName = e.target.name;
    onChange(inputValue, inputName);
  };
  return (
    <>
      <label className={styles.inputLabel} htmlFor="finput">
        {message}
      </label>
      <input
        className={styles.inputText}
        name={name}
        type={inputType}
        value={value}
        placeholder={inputPlaceHolder}
        onChange={onchange}
      />
    </>
  );
};

export default Input;
