import { NavLink } from "react-router-dom";
import { RootState } from "@/components/store/reducers/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./categories.module.scss";
import playstation from "../../../../../public/playstation.png";
import xbox from "../../../../../public/xbox.png";
import windows from "../../../../../public/windows.png";
import SignInModal from "../../sign-in/signInModal";

const Categories = (): JSX.Element => {
  const { isLogged } = useSelector((state: RootState) => state.user);

  const [openXboxProducts, setOpenXboxProducts] = useState(false);
  const [openPcProducts, setOpenPcProducts] = useState(false);
  const [openPlaystationProducts, setOpenPlaystationProducts] = useState(false);
  console.log(openXboxProducts);

  return (
    <div className={styles.categoriesContent}>
      <p className={styles.title}>Categories</p>
      <div className={styles.blockcards}>
        <button type="button" className={styles.card} onClick={() => setOpenXboxProducts(true)}>
          {!isLogged ? (
            <>
              <img src={xbox} alt="description" className={styles.icon} />
              <p className={styles.description}>XBox One</p>
              {openXboxProducts && (
                <SignInModal
                  isOpen={openXboxProducts}
                  onClose={() => {
                    setOpenXboxProducts(false);
                  }}
                  url="/products/xbox"
                />
              )}
            </>
          ) : (
            <NavLink to="/products/xbox" activeClassName={styles.active}>
              <img src={xbox} alt="description" className={styles.icon} />
              <p className={styles.description}>XBox One</p>
            </NavLink>
          )}
        </button>

        <button type="button" className={styles.card} onClick={() => setOpenPcProducts(true)}>
          {!isLogged ? (
            <>
              <img src={windows} alt="description" className={styles.icon} />
              <p className={styles.description}>PC</p>
              {openPcProducts && (
                <SignInModal
                  isOpen={openPcProducts}
                  onClose={() => {
                    setOpenPcProducts(false);
                  }}
                  url="/products/pc"
                />
              )}
            </>
          ) : (
            <NavLink to="/products/pc" activeClassName={styles.active}>
              <img src={windows} alt="description" className={styles.icon} />
              <p className={styles.description}>PC</p>
            </NavLink>
          )}
        </button>

        <button type="button" className={styles.card} onClick={() => setOpenPlaystationProducts(true)}>
          {!isLogged ? (
            <>
              <img src={playstation} alt="description" className={styles.icon} />
              <p className={styles.description}>XBox One</p>
              {openPlaystationProducts && (
                <SignInModal
                  isOpen={openPlaystationProducts}
                  onClose={() => {
                    setOpenPlaystationProducts(false);
                  }}
                  url="/products/playstation"
                />
              )}
            </>
          ) : (
            <NavLink to="/products/playstation" activeClassName={styles.active}>
              <img src={xbox} alt="description" className={styles.icon} />
              <p className={styles.description}>XBox One</p>
            </NavLink>
          )}
        </button>
      </div>
    </div>
  );
};

export default Categories;
