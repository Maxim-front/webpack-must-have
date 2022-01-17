import styles from "./categories.module.scss";
import playstation from "../../../../../public/playstation.png";
import xbox from "../../../../../public/xbox.png";
import windows from "../../../../../public/windows.png";

const Categories = (): JSX.Element => (
  <div className={styles.categoriesContent}>
    <p className={styles.title}>Categories</p>
    <div className={styles.blockcards}>
      <div className={styles.card}>
        <a href="https://www.rockstargames.com/" target="_blank" rel="noreferrer">
          {/* <Link to={{ pathname: "https://www.rockstargames.com/" }} target="_blank"> */}
          <img src={windows} alt="description" className={styles.icon} />
          <p className={styles.description}>PC</p>
        </a>
      </div>

      <div className={styles.card}>
        <a href="https://www.rockstargames.com/" target="_blank" rel="noreferrer">
          <img src={playstation} alt="description" className={styles.icon} />
          <p className={styles.description}>Playstation 5</p>
        </a>
      </div>

      <div className={styles.card}>
        <a href="https://www.rockstargames.com/" target="_blank" rel="noreferrer">
          <img src={xbox} alt="description" className={styles.icon} />
          <p className={styles.description}>XBox One</p>
        </a>
      </div>
    </div>
  </div>
);

export default Categories;
