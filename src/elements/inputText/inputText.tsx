import { FC } from "react";
import styles from "./inputText.module.scss";

interface InputProps {
  message?: string;
  inputType: string;
  value: string;
  name?: string;
  inputPlaceHolder?: string;
  onChange: (value: string, name?: string) => void | (<DebouncedState>(inputValue: string, inputName?: string) => void);
}

const InputText: FC<InputProps> = ({ message, name, inputType, value, inputPlaceHolder, onChange }) => {
  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name.toLowerCase();
    const inputValue = e.target.value.toLowerCase();
    if (inputType === "checkbox") {
      const checkboxes = document.getElementsByName("gameCards");
      onChange(checkboxes);
    } else onChange(inputValue, inputName);
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

export default InputText;
