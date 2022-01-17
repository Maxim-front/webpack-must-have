import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCard } from "../../../../store/reducers/userReducer";
import Input from "../../../../../elements/inputs/inputText/input";
import InputCheckBox from "../../../../../elements/inputs/inputCheckbox/inputCheckbox";
import { addApiCard, deleteResource, editCard, getApiCardResourse } from "../../../../../utils/network";
import Modal from "../../../../../modal/modal";
import styles from "./addCardModal.module.scss";
import { API_CARD_HOME } from "../../../../../constants/api";
import ImageModal from "./imageModal/imageModal";
import DeleteModal from "./deleteModal/deleteModal";

interface CardModalProps {
  toggleModal: () => void;
  isOpen: boolean;
  cardId: number;
}

interface Card {
  id?: number;
  platform: string[];
  title: string;
  image: string;
  price: number;
  genres: string;
  text: string;
  rating: number;
  age: string;
}

const AddCardModal = ({ toggleModal, isOpen, cardId }: CardModalProps): JSX.Element => {
  const initCard: Card = {
    id: -1,
    platform: [],
    title: "",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/No_picture_available.png/401px-No_picture_available.png",
    price: 0,
    genres: "",
    text: "",
    age: "",
    rating: 0,
  };

  const dispatch = useDispatch();

  const initPlatforms = ["pc", "playstation", "xbox"];

  const [cardData, setCardData] = useState<Card>({ ...initCard });
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const toggleImageModal = () => {
    setIsOpenImageModal(!isOpenImageModal);
  };
  const toggleDeleteModal = () => {
    setIsDelete(!isDelete);
  };

  const updateInput = (value: unknown, name?: string) => {
    if (name) setCardData({ ...cardData, [name]: value });
  };

  const onChangeCheckBox = (element: EventTarget & HTMLInputElement) => {
    const newArr = cardData.platform.slice();
    if (newArr.includes(element.value)) {
      const index = newArr.indexOf(element.value);
      newArr.splice(index, 1);
    } else {
      newArr.push(element.value);
    }
    updateInput(newArr, element.name);
  };
  const getResponse = async (param: string) => {
    try {
      const res = await getApiCardResourse<Card>(param);
      setCardData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const saveCard = async () => {
    try {
      toggleModal();
      if (cardId !== -1)
        await editCard(`${API_CARD_HOME}${cardId}`, {
          ...cardData,
        });
      else {
        const copyOfUser = { ...cardData };
        delete copyOfUser.id;
        await addApiCard(`${API_CARD_HOME}`, {
          ...copyOfUser,
        });
      }
      dispatch(setCard({ ...cardData }));
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCard = async () => {
    try {
      toggleModal();
      await deleteResource(`${API_CARD_HOME}${cardId}`);
      dispatch(setCard({ ...cardData }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (cardId !== -1) getResponse(`${API_CARD_HOME}${cardId}`);
  }, [cardId]);

  return (
    <Modal onClose={toggleModal} isOpen={isOpen}>
      <form action="submit" className={styles.submitForm}>
        <div className={styles.header_modal}>
          <p>Edit Card</p>
          <button type="button" onClick={toggleModal} className={styles.close_icon}>
            <FaTimes />
          </button>
        </div>
        <hr className={styles.horizontal_line} />
        <div className={styles.main_modal}>
          <div className={styles.left_content}>
            <p className={styles.image_title}>Card image</p>
            <button type="button" className={styles.card_image} onClick={toggleImageModal}>
              <img src={cardData.image} alt="" />
            </button>
            {isOpenImageModal && <ImageModal toggleImageModal={toggleImageModal} updateInput={updateInput} />}
          </div>
          <div className={styles.right_content}>
            <p className={styles.image_title}>Information</p>
            <div className={styles.input_block}>
              <Input message="name" name="title" inputType="text" value={cardData.title} onChange={updateInput} />
            </div>
            <div className={styles.input_block}>
              <Input message="genres" name="genres" inputType="text" value={cardData.genres} onChange={updateInput} />
            </div>
            <div className={styles.input_block}>
              <Input message="Price" name="price" inputType="text" value={cardData.price} onChange={updateInput} />
            </div>
            <div className={styles.input_block}>
              <p>description</p>
              <textarea
                className={styles.description_content}
                value={cardData.text}
                onChange={(e) => updateInput(e.target.value, e.target.name)}
                name="text"
                cols={30}
                rows={1}
              />
            </div>
            <div className={styles.age_content}>
              <p className={styles.age_text}>Age</p>
              <select
                name="age"
                className={styles.age_select}
                defaultValue={cardData.age}
                onChange={(e) => updateInput(e.target.value, e.target.name)}
              >
                <option value="6">6+</option>
                <option value="12">12+</option>
                <option value="18">18+</option>
              </select>
              <select
                name="rating"
                className={styles.age_select}
                defaultValue={cardData.rating}
                onChange={(e) => updateInput(Number(e.target.value), e.target.name)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className={styles.platform}>
              <h4 className={styles.platform_title}>Platform</h4>
              {initPlatforms.map((platform) => (
                <div className={styles.platform_content}>
                  <p>{platform}</p>
                  <InputCheckBox
                    name="platform"
                    checked={cardData.platform.includes(platform)}
                    inputType="checkbox"
                    value={platform}
                    onChange={onChangeCheckBox}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr className={styles.horizontal_line} />
        <div className={styles.footer_modal}>
          <button type="button" className={styles.footer_button} onClick={saveCard}>
            Submit
          </button>
          <button type="button" className={styles.footer_button} onClick={() => toggleDeleteModal()}>
            Delete Card
          </button>
          {isDelete && (
            <DeleteModal deleteCard={deleteCard} toggleDeleteModal={toggleDeleteModal} name={cardData.title} />
          )}
        </div>
      </form>
    </Modal>
  );
};

export default AddCardModal;
