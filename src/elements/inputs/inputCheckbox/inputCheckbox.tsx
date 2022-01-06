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
    // console.log(e.target.value, e.target.checked);
    // const checkBoxesValue: string[] = [];
    // for (let index = 0; index < checkboxes.length; index++) {
    //   if (checkboxes[index].checked) {
    //     checkBoxesValue.push(checkboxes[index].value);
    //   }
    // }
    onChange(element);
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
        checked={checked}
        placeholder={inputPlaceHolder}
        onChange={onchange}
      />
    </>
  );
};

export default InputCheckBox;
