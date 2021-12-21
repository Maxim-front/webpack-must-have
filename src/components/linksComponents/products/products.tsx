import { getApiCardResourse } from "@/utils/network";
import { lazy, Suspense, useEffect, useState } from "react";
import { API_PRODUCT_CARDS } from "../../../constants/api";
import Filter from "./filter/filter";
import styles from "./products.module.scss";
import Search from "./search/search";

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
}

const Products = ({ category }: ProductsProps): JSX.Element => {
  const [items, setItems] = useState<Array<Card>>([]);
  const [genres, setGenres] = useState("all genres");
  const [age, setAge] = useState("all ages");
  const [sortCriteria, setSortCriteria] = useState("stars");
  const [sortType, setSortType] = useState("asc");

  const getResponse = async (param: string) => {
    console.log(param);
    try {
      const res = await getApiCardResourse<Array<Card>>(param);
      setItems(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (genres !== "all genres" && age !== "all ages") {
  //     getResponse(
  //       `${API_PRODUCT_CARDS + category}&genres=${genres}&age=${age}?_sort=${sortCriteria}&_order=${sortType}`
  //     );
  //   }
  //   if (age !== "all ages" && genres === "all genres") {
  //     console.log(sortCriteria, sortType);
  //     getResponse(`${API_PRODUCT_CARDS + category}&age=${age}?_sort=date&_order=desc`);
  //   }
  //   if (genres !== "all genres" && age === "all ages") {
  //     getResponse(`${API_PRODUCT_CARDS + category}&genres=${genres}?_sort=${sortCriteria}&_order=${sortType}`);
  //   }
  //   if (genres === "all genres" && age === "all ages") {
  //     getResponse(`${API_PRODUCT_CARDS + category}?_sort=${sortCriteria}&_order=${sortType}`);
  //   }
  // }, [category, genres, age, sortCriteria, sortType]);

  useEffect(() => {
    if (genres !== "all genres" && age !== "all ages") {
      getResponse(`${API_PRODUCT_CARDS + category}&genres=${genres}&age=${age}`);
    }
    if (age !== "all ages" && genres === "all genres") {
      console.log(sortCriteria, sortType);
      getResponse(`${API_PRODUCT_CARDS + category}&age=${age}`);
    }
    if (genres !== "all genres" && age === "all ages") {
      getResponse(`${API_PRODUCT_CARDS + category}&genres=${genres}`);
    }
    if (genres === "all genres" && age === "all ages") {
      getResponse(`${API_PRODUCT_CARDS + category}`);
    }
  }, [category, genres, age, sortCriteria, sortType]);

  const onChange = (value: string, name?: string) => {
    console.log(value, name);
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

  const ProductCards = lazy(() => import("./productCards/product_cards"));

  return (
    <div className={styles.products_page}>
      <Filter onchange={onChange} />
      <div className={styles.right_components}>
        <Search />
        <Suspense fallback={<img src="https://i.gifer.com/g0R5.gif" alt="" className={styles.loader} />}>
          <ProductCards items={items} />
        </Suspense>
      </div>
    </div>
  );
};

export default Products;
