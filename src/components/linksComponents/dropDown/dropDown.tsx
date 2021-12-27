import { NavLink } from "react-router-dom";
import styles from "./dropDown.module.scss";

const DropDown = (): JSX.Element => (
  <>
    <NavLink to="/products/playstation" className={styles.item} activeClassName={styles.active}>
      PlayStation 5
    </NavLink>
    <NavLink to="/products/xbox" className={styles.item} activeClassName={styles.active}>
      Xbox One
    </NavLink>
    <NavLink to="/products/pc" className={styles.item} activeClassName={styles.active}>
      PC
    </NavLink>
  </>
);

export default DropDown;
