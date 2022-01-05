import { RootState } from "@/components/store/reducers/store";
import { getApiCardResourse } from "@/utils/network";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_PRODUCT_CARDS } from "../../../constants/api";
import Gamecards from "../home/gameCards/gameCards";
import Searchbar from "../home/searchBar/searchBar";
import Filter from "./filter/filter";
import styles from "./products.module.scss";

interface ProductsProps {
  platform: string;
}

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

const Products = ({ platform }: ProductsProps): JSX.Element => {
  const [items, setItems] = useState<Array<Card>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const card = useSelector((state: RootState) => state.card);

  const initSortAndFilterProps = {
    genres: "all genres",
    age: "all ages",
    sortByCriteria: "rating",
    sortByType: "asc",
  };

  const [sortAndFilterProps, setSortAndFilterProps] = useState({ ...initSortAndFilterProps });
  const { genres, age, sortByCriteria, sortByType } = sortAndFilterProps;

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
        `${API_PRODUCT_CARDS + platform}&genres=${genres}&age=${age}&_sort=${sortByCriteria}&_order=${sortByType}`
      );
    }
    if (age !== "all ages" && genres === "all genres") {
      getResponse(`${API_PRODUCT_CARDS + platform}&age=${age}&_sort=date&_order=desc`);
    }
    if (genres !== "all genres" && age === "all ages") {
      getResponse(`${API_PRODUCT_CARDS + platform}&genres=${genres}&_sort=${sortByCriteria}&_order=${sortByType}`);
    }
    if (genres === "all genres" && age === "all ages") {
      getResponse(`${API_PRODUCT_CARDS + platform}&_sort=${sortByCriteria}&_order=${sortByType}`);
    }
  }, [platform, sortAndFilterProps, card]);

  const onChange = (value: string, name?: string) => {
    if (name) setSortAndFilterProps({ ...initSortAndFilterProps, [name]: value });
  };

  return (
    <div className={styles.products_page}>
      <Filter onchange={onChange} platform={platform} />
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
