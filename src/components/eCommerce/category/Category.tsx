import { Link } from "react-router-dom";
import styles from "./Category.module.css";
import { TCategory } from "src/types/categoryTypes";
const { category, categoryImg, categoryTitle } = styles;

const Category = ({ img, title, prefix }: TCategory) => {
  return (
    <Link to={`/categories/products/${prefix}`}>
      <div className={category}>
        <div className={categoryImg}>
          <img src={img} alt={title} />
        </div>
        <h4 className={categoryTitle}>{title}</h4>
      </div>
    </Link>
  );
};

export default Category;
