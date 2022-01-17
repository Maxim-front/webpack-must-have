import { useState } from "react";
import AddCardModal from "./addCardModal/addCardModal";
import styles from "./gameCards.module.scss";
import RenderCards from "./renderCards";

interface Card {
  id: number;
  platform: string;
  image: string;
  title: string;
  price: number;
  text: string;
  rating: number;
  date?: string;
}
interface ProductProps {
  items: Array<Card>;
  title: string;
}

function Gamecards({ items, title }: ProductProps): JSX.Element {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cardId, setCardId] = useState(0);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  const getIdCard = (idValue = -1) => {
    setCardId(idValue);
    setIsOpenModal(!isOpenModal);
  };
  return (
    <div className={styles.categoriesContent}>
      <p className={styles.title}>{title}</p>
      <div className={styles.blockcards}>
        {items.map((element) => (
          <RenderCards key={element.id} card={element} getIdCard={getIdCard} />
        ))}
      </div>
      {isOpenModal && <AddCardModal toggleModal={toggleModal} cardId={cardId} isOpen={isOpenModal} />}
    </div>
  );
}
export default Gamecards;
