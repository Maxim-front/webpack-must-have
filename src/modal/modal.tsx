import { ReactChild, ReactNode } from "react";
import ReactDOM from "react-dom";
import styles from "./modal.module.scss";

interface MyState {
  onClose: () => void;
  isOpen: boolean;
  children: ReactChild | ReactNode;
}

const Modal = ({ onClose, isOpen, children }: MyState): JSX.Element | null => {
  if (!isOpen) return null;

  const keyHandler = (key: string) => {
    if (key === "Enter") {
      console.log("enter press here!");
    }
  };

  return ReactDOM.createPortal(
    <div role="button" className={styles.modal} onClick={onClose} tabIndex={0} onKeyPress={(e) => keyHandler(e.key)}>
      <div
        role="button"
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        tabIndex={0}
        onKeyPress={(e) => keyHandler(e.key)}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};
export default Modal;
