import Modal from "@/modal/modal";
import styles from "./deleteModal.module.scss";
import "react-toastify/dist/ReactToastify.css";

interface RootState {
  deleteCard: () => void;
  toggleDeleteModal: () => void;
  name: string;
}

const DeleteModal = ({ deleteCard, toggleDeleteModal, name }: RootState): JSX.Element | null => (
  <>
    <Modal onClose={toggleDeleteModal} isOpen>
      <form action="submit" className={styles.submitForm}>
        <div className={styles.header_modal}>
          <span>Are you sure you want to delete the product {name}?</span>
        </div>
        <div className={styles.button_block}>
          <button type="button" onClick={deleteCard} className={styles.delete_buttons}>
            Yes
          </button>
          <button type="button" onClick={toggleDeleteModal} className={styles.delete_buttons}>
            No
          </button>
        </div>
      </form>
    </Modal>
  </>
);

export default DeleteModal;
