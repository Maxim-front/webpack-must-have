import { RootState } from "@/components/store/reducers/store";
import { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import StarRating from "../starRating/starRating";
import styles from "./renderCards.module.scss";

import playstation from "../../../../../public/playstation.png";
import xbox from "../../../../../public/xbox.png";
import pc from "../../../../../public/windows.png";

interface Cards {
  id: number;
  platform: string;
  title: string;
  image: string;
  price: number;
  text: string;
  rating: number;
}

interface Card {
  id: number;
  title: string;
  platform: string;
  amount: number;
  price: number;
}
type CartArray = Card[];
interface MyProps {
  card: Cards;
  getIdCard: (idCard?: number) => void;
}

const RenderCards: FC<MyProps> = ({ card, getIdCard }: MyProps): JSX.Element => {
  const { id, image, title, price, text, rating, platform } = card;

  const user = useSelector((state: RootState) => state.user);

  const platformsPictures = { pc, playstation, xbox };
  const renderPlatforms: string[] = [];

  Object.entries(platformsPictures).forEach(([key, value]) => {
    if (platform.includes(`${key}`)) renderPlatforms.push(`${value}`);
  });

  const { email } = user;
  const addCard = () => {
    const temp = localStorage.getItem("localCards");
    const persistedState: CartArray = temp ? JSON.parse(temp) : {};
    if (persistedState.length > 0 && persistedState.some((e) => e.id === id)) {
      const newArr = persistedState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            amount: item.amount + 1,
            price: item.price * item.amount,
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
    <div className={styles.card}>
      <div className={styles.front}>
        <div className={styles.icon}>
          <img src={image} alt="description" className={styles.images} />
          <div className={styles.platforms}>
            {renderPlatforms.map((elem) => (
              <img key={uuidv4()} src={elem} alt="description" className={styles.platforms_image} />
            ))}
          </div>
        </div>
        <div className={styles.iconContent}>
          <p>{title}</p>
          <p>{price}$</p>
        </div>
        <StarRating rating={rating} />
      </div>
      <div className={styles.back}>
        <p className={styles.backText}>{text}</p>
        <div className={styles.backButtons}>
          {email && email !== "admin@admin.com" && (
            <button type="button" className={styles.buttonSubmit} onClick={addCard}>
              Add Card
            </button>
          )}
          {email === "admin@admin.com" && (
            <button type="button" className={styles.buttonSubmit} onClick={() => getIdCard(id)}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RenderCards;
