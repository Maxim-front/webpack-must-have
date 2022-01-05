import Input from "@/elements/inputs/inputText/input";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "@/modal/modal";

import styles from "./imageModal.module.scss";
import "react-toastify/dist/ReactToastify.css";

interface RootState {
  toggleImageModal: () => void;
  updateInput: (value: unknown, name?: string) => void;
}

const ImageModal = ({ toggleImageModal, updateInput }: RootState): JSX.Element | null => {
  const [imageValue, setImageValue] = useState("");
  const [imageName, setImageName] = useState<undefined | string>("");
  const updateProps = (value: string, name?: string) => {
    setImageValue(value);
    setImageName(name);
  };

  const submitImage = () => {
    updateInput(imageValue, imageName);
    toggleImageModal();
  };

  return (
    <>
      <Modal onClose={toggleImageModal} isOpen>
        <form action="submit" className={styles.submitForm}>
          <div className={styles.header_modal}>
            <span>Link to your image</span>
            <button type="button" onClick={toggleImageModal} className={styles.close_icon}>
              <FaTimes />
            </button>
          </div>
          <div className={styles.inputBlock}>
            <Input message="New Image" name="image" inputType="text" value={imageValue} onChange={updateProps} />
          </div>
          <div className={styles.button_block}>
            <button type="button" className={styles.buttonSubmit} onClick={submitImage}>
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ImageModal;
