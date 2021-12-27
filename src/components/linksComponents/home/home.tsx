import { useEffect, useState } from "react";
import { getApiCardResourse } from "../../../utils/network";
import { API_CARDS } from "../../../constants/api";
import Categories from "./categories/categories";
import Searchbar from "./searchBar/searchBar";
import styles from "./home.module.scss";
import Gamecards from "./gameCards/gameCards";

interface Card {
  id: number;
  image: string;
  platform: string;
  title: string;
  price: string;
  text: string;
  stars: number;
  date: string;
  category: string;
}
const Home = (): JSX.Element => {
  const [items, setItems] = useState<Array<Card>>([]);

  const getResponse = async (param: string) => {
    try {
      const res = await getApiCardResourse<Array<Card>>(param);
      setItems(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getResponse(API_CARDS);
  }, []);
  return (
    <div className={styles.homecontent}>
      <Searchbar />
      <Categories />
      <Gamecards items={items} title="New Games" />
    </div>
  );
};

export default Home;
