import { useDebouncedCallback } from "use-debounce";
import styles from "./filter.module.scss";
import InputText from "../../../../elements/inputText/inputText";

interface ProductsProps {
  onchange: (value: string, name?: string) => void;
}

const Filter = ({ onchange }: ProductsProps): JSX.Element => {
  const debounced = useDebouncedCallback((value: string, name?: string) => {
    console.log(value, name);
    onchange(value, name);
  }, 500);

  return (
    <div className={styles.filter}>
      <h3 className={styles.product_title}>PC</h3>
      <hr className={styles.horizontal_line} />
      <h4 className={styles.product_title}>Sort</h4>
      <hr className={styles.horizontal_line} />
      <div className={styles.sort}>
        <div className={styles.sort_content}>
          <p className={styles.sort_text}>Criteria</p>
          <select
            name="sortByCriteria"
            className={styles.sort_select}
            defaultValue="rating"
            onChange={(e) => debounced(e.target.value, e.target.name)}
          >
            <option value="rating">Rating</option>
            <option value="price" selected>
              Price
            </option>
          </select>
        </div>
        <div className={styles.sort_content}>
          <p className={styles.sort_text}>Type</p>
          <select
            name="sortByType"
            className={styles.sort_select}
            defaultValue="asc"
            onChange={(e) => debounced(e.target.value, e.target.name)}
          >
            <option value="asc" selected>
              ascending
            </option>
            <option value="desc">descending</option>
          </select>
        </div>
      </div>
      <div className={styles.genres}>
        <h4 className={styles.product_title}>Genres</h4>
        <hr className={styles.horizontal_line} />
        <div className={styles.genres_content}>
          <div>
            <InputText name="genres" inputType="radio" value="All genres" onChange={debounced} />
            <span>All genres</span>
          </div>
          <div>
            <InputText name="genres" inputType="radio" value="Shooter" onChange={debounced} />
            <span>Shooter</span>
          </div>
          <div>
            <InputText name="genres" inputType="radio" value="Arcade" onChange={debounced} />
            <span>Arcade</span>
          </div>
          <div>
            <InputText name="genres" inputType="radio" value="Survive" onChange={debounced} />
            <span>Survive</span>
          </div>
        </div>
      </div>
      <div className={styles.age}>
        <h4 className={styles.product_title}>Age</h4>
        <hr className={styles.horizontal_line} />
        <div className={styles.age_content}>
          <div>
            <InputText name="age" inputType="radio" value="All ages" onChange={debounced} />
            <span>All ages</span>
          </div>
          <div>
            <InputText name="age" inputType="radio" value="3" onChange={debounced} />
            <span>3+</span>
          </div>
          <div>
            <InputText name="age" inputType="radio" value="6" onChange={debounced} />
            <span>6+</span>
          </div>
          <div>
            <InputText name="age" inputType="radio" value="12" onChange={debounced} />
            <span>12+</span>
          </div>
          <div>
            <InputText name="age" inputType="radio" value="18" onChange={debounced} />
            <span>18+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
