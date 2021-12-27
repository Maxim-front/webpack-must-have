import styles from "./gameCards.module.scss";
import RenderCards from "./renderCards";

interface Card {
  id: number;
  platform: string;
  image: string;
  title: string;
  price: string;
  text: string;
  stars: number;
  date: string;
}
interface ProductProps {
  items: Array<Card>;
  title: string;
}

function Gamecards({ items, title }: ProductProps): JSX.Element {
  return (
    <div className={styles.categoriesContent}>
      <p className={styles.title}>{title}</p>
      <div className={styles.blockcards}>
        {items.map((element) => (
          <RenderCards item={element} />
        ))}
      </div>
    </div>
  );
}
export default Gamecards;
