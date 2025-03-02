import { Form, Button } from "react-bootstrap";
import styles from "./CartItem.module.css";
import { TProduct } from "src/types/productTypes";
import { memo } from "react";

const { cartItem, product, productImg, productInfo, cartItemSelection } =
  styles;

type TCartItemProps = TProduct & {
  changeItemQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
};

const CartItem = memo(
  ({
    id,
    title,
    img,
    price,
    max,
    quantity,
    changeItemQuantity,
    removeItem,
  }: TCartItemProps) => {
    const renderOptions = Array(max)
      .fill(0)
      .map((_, idx) => {
        const index = ++idx;
        return (
          <option value={index} key={index}>
            {index}
          </option>
        );
      });

    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changeItemQuantity(id, quantity);
    };

    return (
      <div className={cartItem}>
        <div className={product}>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <div className={productInfo}>
            <h2>{title}</h2>
            <h3>{price} EGP</h3>
            <Button
              variant="secondary"
              style={{ color: "white" }}
              className="mt-auto"
              onClick={() => removeItem(id)}
            >
              Remove
            </Button>
          </div>
        </div>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select
            aria-label="Default select example"
            value={quantity}
            onChange={changeQuantity}
          >
            {renderOptions}
          </Form.Select>
        </div>
      </div>
    );
  }
);

export default CartItem;
