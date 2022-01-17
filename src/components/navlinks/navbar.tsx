import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaSignOutAlt } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import DropDown from "../linksComponents/dropDown/dropDown";
import styles from "./navbar.module.scss";
import SignInModal from "../linksComponents/sign-in/signInModal";
import SignUpModal from "../linksComponents/sign-up/signUpModal";
import { setUser } from "../store/reducers/userReducer";

interface RootState {
  user: {
    userName: string;
    isLogged: boolean;
  };
}

const Navbar = (): JSX.Element => {
  const [openSignUp, setOpenSignUp] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);

  const { userName, isLogged } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  const SignOut = () => {
    localStorage.clear();
    dispatch(
      setUser({
        isLogged: false,
      })
    );
  };

  return (
    <ul className={styles.nav}>
      <li className={styles.item}>
        <NavLink to="/home" activeClassName={styles.active}>
          Home
        </NavLink>
      </li>
      <li className={`${styles.item} ${styles.dropDown_link}`}>
        {!isLogged ? (
          <button type="button" className={styles.modaleButton} onClick={() => setOpenProducts(true)}>
            <NavLink to="/products" activeClassName={styles.active}>
              Products
            </NavLink>
            {openProducts && (
              <SignInModal
                isOpen={openProducts}
                onClose={() => {
                  setOpenProducts(false);
                }}
                url="/products"
              />
            )}
          </button>
        ) : (
          <>
            <NavLink to="/products" activeClassName={styles.active}>
              Products
            </NavLink>
            <div className={styles.dropDown_wrapper}>
              <DropDown />
            </div>
          </>
        )}
      </li>
      <li className={styles.item}>
        {!isLogged ? (
          <button type="button" className={styles.modaleButton} onClick={() => setOpenAbout(true)}>
            <NavLink to="/about" activeClassName={styles.active}>
              About
            </NavLink>
            {openAbout && (
              <SignInModal
                isOpen={openAbout}
                onClose={() => {
                  setOpenAbout(false);
                }}
                url="/about"
              />
            )}
          </button>
        ) : (
          <NavLink to="/about" activeClassName={styles.active}>
            About
          </NavLink>
        )}
      </li>
      <li className={styles.item}>
        {!isLogged ? (
          <button type="button" className={styles.modaleButton} onClick={() => setOpenSignIn(true)}>
            <NavLink to="/sign-in" activeClassName={styles.active}>
              Sign In
            </NavLink>
            {openSignIn && <SignInModal isOpen={openSignIn} onClose={() => setOpenSignIn(false)} url="/home" />}
          </button>
        ) : (
          <NavLink to="/profile" activeClassName={styles.active}>
            {userName}
          </NavLink>
        )}
      </li>
      {!isLogged ? (
        <li className={styles.item}>
          <button type="button" className={styles.modaleButton} onClick={() => setOpenSignUp(true)}>
            <NavLink to="/sign-up" activeClassName={styles.active}>
              Sign Up
            </NavLink>
            {openSignUp && <SignUpModal isOpen={openSignUp} onClose={() => setOpenSignUp(false)} />}{" "}
          </button>
        </li>
      ) : (
        <>
          <li className={styles.item}>
            <NavLink to="/home/order_list" activeClassName={styles.active}>
              <FaShoppingCart />
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink to="/home" onClick={SignOut}>
              <FaSignOutAlt />
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default React.memo(Navbar);
