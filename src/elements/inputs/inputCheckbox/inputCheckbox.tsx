import { FC } from "react";
import styles from "./inputCheckbox.module.scss";

interface InputProps {
  message?: string;
  checked?: boolean;
  inputType: string;
  value: string;
  name: string;
  inputPlaceHolder?: string;
  onChange: (element: EventTarget & HTMLInputElement) => void;
}

const InputCheckBox: FC<InputProps> = ({ message, checked, name, inputType, value, inputPlaceHolder, onChange }) => {
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const element = e.target;
    onChange(element);
  };
  return (
    <>
      <label className={styles.input_label} htmlFor="finput">
        {message}
      </label>
      <input
        className={styles.input_text}
        name={name}
        type={inputType}
        value={value}
        checked={checked}
        placeholder={inputPlaceHolder}
        onChange={onchange}
      />
    </>
  );
};

export default InputCheckBox;
