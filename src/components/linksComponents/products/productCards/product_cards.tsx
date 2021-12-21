import styles from "./cards.module.scss";
import RenderCards from "../../home/gameCards/renderCards";

interface Card {
  id: number;
  image: string;
  title: string;
  price: string;
  text: string;
  stars: number;
  date: string;
}

interface ProductProps {
  items: Array<Card>;
}

function ProductCards({ items }: ProductProps): JSX.Element {
  // const [items, setItems] = useState<Array<Card>>([]);

  // const getResponse = async (param: string) => {
  //   try {
  //     const res = await getApiCardResourse<Array<Card>>(param);
  //     setItems(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getResponse(API_CARDS);
  // }, []);

  return (
    <div className={styles.categoriesContent}>
      <p className={styles.title}>Products</p>
      <div className={styles.blockcards}>
        {items.map((element) => (
          <RenderCards item={element} />
        ))}
      </div>
    </div>
  );
}
export default ProductCards;
