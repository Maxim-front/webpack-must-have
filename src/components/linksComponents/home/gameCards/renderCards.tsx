import { FC } from "react";
import StarRating from "../starRating/starRating";
import styles from "./renderCards.module.scss";

interface Cards {
  id: number;
  platform: string;
  title: string;
  image: string;
  price: string;
  text: string;
  stars: number;
}

interface Card {
  id: number;
  title: string;
  platform: string;
  amount: number;
  price: string;
}
type CartArray = Card[];
interface MyProps {
  item: Cards;
}

const RenderCards: FC<MyProps> = (props): JSX.Element => {
  const { id, image, title, price, text, stars, platform } = props.item;

  const addCard = () => {
    const temp = localStorage.getItem("localCards");
    const persistedState: CartArray = temp ? JSON.parse(temp) : {};
    if (persistedState.length > 0 && persistedState.some((e) => e.id === id)) {
      const newArr = persistedState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            amount: item.amount + 1,
            price: `${Number(item.price.slice(0, item.price.indexOf("$"))) * item.amount}$`,
          };
        }
        return item;
      });
      localStorage.setItem("localCards", JSON.stringify(newArr));
    } else if (persistedState.length > 0)
      localStorage.setItem(
        "localCards",
        JSON.stringify([...persistedState, { id, title, platform, amount: 1, price }])
      );
    else localStorage.setItem("localCards", JSON.stringify([{ id, title, platform, amount: 1, price }]));
  };

  return (
    <button type="button" className={styles.card} onClick={addCard}>
      <div className={styles.front}>
        <div className={styles.icon}>
          <img src={image} alt="description" className={styles.images} />
        </div>
        <div className={styles.iconContent}>
          <p>{title}</p>
          <p>{price}</p>
        </div>
        <StarRating rating={stars} />
      </div>
      <div className={styles.back}>
        <span className={styles.backText}>{text}</span>
      </div>
    </button>
  );
};

export default RenderCards;
