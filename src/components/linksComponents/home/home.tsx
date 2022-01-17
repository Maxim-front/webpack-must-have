import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/components/store/reducers/store";
import { getApiCardResourse } from "../../../utils/network";
import { API_CARDS, API_SEARCH } from "../../../constants/api";
import Categories from "./categories/categories";
import Searchbar from "./searchBar/searchBar";
import styles from "./home.module.scss";
import Gamecards from "./gameCards/gameCards";

interface Card {
  id: number;
  image: string;
  title: string;
  price: number;
  text: string;
  rating: number;
  date: string;
  platform: string;
}
const Home = (): JSX.Element => {
  const [items, setItems] = useState<Array<Card>>([]);
  const card = useSelector((state: RootState) => state.card);

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
  }, [card]);
  return (
    <div className={styles.homecontent}>
      <Searchbar urlTest={API_SEARCH} />
      <Categories />
      <Gamecards items={items} title="New Games" />
    </div>
  );
};

export default React.memo(Home);
