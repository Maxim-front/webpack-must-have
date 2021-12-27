import InputText from "@/elements/inputText/inputText";
import { useState } from "react";
import styles from "./cartInfo.module.scss";

interface Element {
  id: number;
  title: string;
  platform: string;
  amount: number;
  price: string;
}

type SelectCards = string[];

interface CartArray {
  cards: Element[];
  deleteItem: (value: string[]) => void;
  updateCards: (value: Element[]) => void;
}

const CartInfo = ({ cards, deleteItem, updateCards }: CartArray): JSX.Element => {
  const [selectValues, setSelectValues] = useState<SelectCards>([]);


  return (
    <>
      {cards.map(
        (element) =>
          element.id > 0 && (
            <>
              <div className={styles.cart}>
                <p>{element.title}</p>
                <select
                  name="platform"
                  className={styles.sort_select}
                  defaultValue={element.platform}
                  onChange={(e) => changePlatform(e.target.value, element.id)}
                >
                  <option value="pc" selected>
                    pc
                  </option>
                  <option value="xbox">xbox</option>
                  <option value="playStation">playStation</option>
                </select>
                <p>{new Date().toLocaleDateString()}</p>
                <textarea
                  className={styles.inputText}
                  defaultValue={element.amount}
                  onChange={(e) => changeAmount(e.target.value, element.id)}
                  name="amount"
                  cols={15}
                  rows={1}
                />
                <p>{element.price}</p>
                <InputText name="gameCards" inputType="checkbox" value={element.id.toString()} onChange={selectCards} />
              </div>
              <hr className={styles.horizontal_line} />
            </>
          )
      )}
      <button type="submit" className={styles.buttonRemove} onClick={() => deleteItem(selectValues)}>
        Remove
      </button>
    </>
  );
};

export default CartInfo;
