import { TProduct } from "src/types/productTypes";
import styles from "./CartSubtotalPrice.module.css";

type productsProps = {
  products: TProduct[];
};

const CartSubtotalPrice = ({ products }: productsProps) => {
  const subTotal = products.reduce((prev, el) => {
    const price = el.price;
    const quantity = el.quantity;

    return prev + price * quantity;
  }, 0);

  return (
    <div className={styles.container}>
      <span>subTotal: </span>
      <span>{subTotal.toFixed(2)}</span>
    </div>
  );
};

export default CartSubtotalPrice;
