import { useCallback, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import debounce from "lodash/debounce";
import { useSelector } from "react-redux";
import { RootState } from "@/components/store/reducers/store";
import { API_SEARCH } from "../../../../constants/api";
import { getApiCardResourse } from "../../../../utils/network";
import styles from "./searchBar.module.scss";
import ListResults from "./listResults/listResults";
import AddCardModal from "../gameCards/addCardModal/addCardModal";

interface Card {
  id: number;
  image: string;
  title: string;
  price: number;
  text: string;
  rating: number;
  date: string;
}

const Searchbar = (): JSX.Element => {
  const [searchInput, setSearchInput] = useState("");
  const [items, setItems] = useState<Array<Card>>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [cardId, setCardId] = useState(0);

  const user = useSelector((state: RootState) => state.user);

  const { email } = user;

  const getIdCard = (idValue = -1) => {
    setCardId(idValue);
    setIsOpenModal(!isOpenModal);
  };

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const getResponse = async (param: string) => {
    setIsLoading(true);
    try {
      const res = await getApiCardResourse<Array<Card>>(API_SEARCH + param);
      setIsLoading(false);
      setItems(res);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedGetResponse = useCallback(
    debounce((value) => getResponse(value), 300),
    []
  );

  const searchItems = (searchValue: string) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      debouncedGetResponse(searchValue);
    } else console.log("enter value");
  };

  return (
    <div className={styles.input_form}>
      <div className={styles.input_search}>
        <div className={styles.loader_icon}>
          {isLoading && <img src="https://i.gifer.com/g0R5.gif" alt="" className={styles.loader} />}
        </div>
        <input
          type="text"
          className={styles.searchbar}
          value={searchInput}
          onChange={(e) => searchItems(e.target.value)}
          placeholder="Search name"
        />
      </div>
      {email === "admin@admin.com" && (
        <button type="button" className={styles.buttonSubmit} onClick={() => getIdCard()}>
          Add to Card
        </button>
      )}
      {isOpenModal && <AddCardModal toggleModal={toggleModal} cardId={cardId} isOpen={isOpenModal} />}
      {items.length >= 1 && searchInput && <ListResults elements={items} />}
    </div>
  );
};

export default Searchbar;
