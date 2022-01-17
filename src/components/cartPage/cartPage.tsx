import { useState } from "react";
import CartInfo from "./cartInfo/cartInfo";

import styles from "./cartPage.module.scss";

interface Card {
  id: number;
  title: string;
  platform: string;
  amount: number;
  price: number;
}

type CartArray = Card[];

const CartPage = (): JSX.Element => {
  const temp = localStorage.getItem("localCards");
  const persistedState: CartArray = temp ? JSON.parse(temp) : {};
  const [arrayCards, setArray] = useState<CartArray>(persistedState);

  const updateCards = (newArr: CartArray) => {
    setArray(newArr);
    localStorage.setItem("localCards", JSON.stringify(newArr));
  };

  const deleteItem = (value: string[]) => {
    const filteredItems = persistedState.filter((item) => !value.includes(item.id.toString()));
    localStorage.setItem("localCards", JSON.stringify(filteredItems));
    setArray(filteredItems);
  };

  const sumPrice = () => {
    if (persistedState.length > 0) {
      const total = persistedState.reduce((sum, current) => sum + current.price * current.amount, 0);
      return total.toFixed(2);
    }
    return 0;
  };

  const submitSelectedProducts = () => {
    console.log(persistedState);
  };

  return (
    <div className={styles.cart_page}>
      <h3 className={styles.cart_title}>Cart page</h3>
      <hr className={styles.horizontal_line} />
      <div className={styles.table_titles}>
        <p>Name</p>
        <p>Platform</p>
        <p>Order date</p>
        <p>Amount</p>
        <p>Price ($)</p>
      </div>
      <hr className={styles.horizontal_line} />
      <CartInfo cards={arrayCards} deleteItem={deleteItem} updateCards={updateCards} />
      <div className={styles.cart_page_footer}>
        <p>{`Games Cost:${sumPrice()}$`}</p>
        <p>Your balance: 32.98$</p>
        <button type="button" className={styles.buttonBuy} onClick={() => submitSelectedProducts()}>
          Buy
        </button>
      </div>
    </div>
  );
};

export default CartPage;
