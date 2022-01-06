import InputCheckBox from "@/elements/inputs/inputCheckbox/inputCheckbox";
import { useState } from "react";
import styles from "./cartInfo.module.scss";

interface Element {
  id: number;
  title: string;
  platform: string;
  amount: number;
  price: number;
}

type SelectCards = string[];

interface CartArray {
  cards: Element[];
  deleteItem: (value: string[]) => void;
  updateCards: (value: Element[]) => void;
}

const CartInfo = ({ cards, deleteItem, updateCards }: CartArray): JSX.Element => {
  const [selectValues, setSelectValues] = useState<SelectCards>([]);

  const selectCards = (element: EventTarget & HTMLInputElement) => {
    const newArr = selectValues.slice();
    if (newArr.includes(element.value)) {
      const index = newArr.indexOf(element.value);
      newArr.splice(index, 1);
    } else {
      newArr.push(element.value);
    }
    setSelectValues(newArr);
  };

  const changeValues = (value: string | number, name: string, idElement: number) => {
    const newArr = cards.map((item) => {
      if (item.id === idElement) {
        return {
          ...item,
          [name]: value,
        };
      }
      return item;
    });
    updateCards(newArr);
  };

  return (
    <>
      {cards.length > 0 &&
        cards.map(
          (element) =>
            element.id > 0 && (
              <>
                <div className={styles.cart}>
                  <p>{element.title}</p>
                  <select
                    name="platform"
                    className={styles.sort_select}
                    defaultValue={element.platform}
                    onChange={(e) => changeValues(e.target.value, e.target.name, element.id)}
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
                    onChange={(e) => changeValues(Number(e.target.value), e.target.name, element.id)}
                    name="amount"
                    cols={15}
                    rows={1}
                  />
                  <p>{element.price}$</p>
                  <InputCheckBox
                    name="gameCards"
                    inputType="checkbox"
                    value={element.id.toString()}
                    onChange={selectCards}
                  />
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
