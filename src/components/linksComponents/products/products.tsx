import { getApiCardResourse } from "@/utils/network";
import { useEffect, useState } from "react";
import { API_PRODUCT_CARDS } from "../../../constants/api";
import Gamecards from "../home/gameCards/gameCards";
import Searchbar from "../home/searchBar/searchBar";
import Filter from "./filter/filter";
import styles from "./products.module.scss";

interface ProductsProps {
  category: string;
}

interface Card {
  id: number;
  image: string;
  title: string;
  price: string;
  text: string;
  stars: number;
  date: string;
  category: string;
  platform: string;
}

const Products = ({ category }: ProductsProps): JSX.Element => {
  const [items, setItems] = useState<Array<Card>>([]);
  const [genres, setGenres] = useState("all genres");
  const [age, setAge] = useState("all ages");
  const [sortCriteria, setSortCriteria] = useState("stars");
  const [sortType, setSortType] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);

  const getResponse = async (param: string) => {
    setIsLoading(true);
    try {
      const res = await getApiCardResourse<Array<Card>>(param);
      setItems(res);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (genres !== "all genres" && age !== "all ages") {
      getResponse(
        `${API_PRODUCT_CARDS + category}&genres=${genres}&age=${age}&_sort=${sortCriteria}&_order=${sortType}`
      );
    }
    if (age !== "all ages" && genres === "all genres") {
      getResponse(`${API_PRODUCT_CARDS + category}&age=${age}&_sort=date&_order=desc`);
    }
    if (genres !== "all genres" && age === "all ages") {
      getResponse(`${API_PRODUCT_CARDS + category}&genres=${genres}&_sort=${sortCriteria}&_order=${sortType}`);
    }
    if (genres === "all genres" && age === "all ages") {
      getResponse(`${API_PRODUCT_CARDS + category}&_sort=${sortCriteria}&_order=${sortType}`);
    }
  }, [category, genres, age, sortCriteria, sortType]);

  const onChange = (value: string, name?: string) => {
    if (name === "genres") {
      setGenres(value);
    }
    if (name === "age") {
      setAge(value);
    }
    if (name === "sortByCriteria") {
      setSortCriteria(value);
    }
    if (name === "sortByType") {
      setSortType(value);
    }
  };

  return (
    <div className={styles.products_page}>
      <Filter onchange={onChange} />
      <div className={styles.right_components}>
        <Searchbar />
        {isLoading ? (
          <img src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" alt="" className={styles.loader} />
        ) : (
          <Gamecards items={items} title="Products" />
        )}
      </div>
    </div>
  );
};

export default Products;
