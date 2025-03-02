import { Button, Spinner } from "react-bootstrap";
import styles from "./Product.module.css";
import { TProduct } from "src/types/productTypes";
import { useAppDispatch } from "@store/storeHooks";
import { addToCart } from "@store/cart/cartSlice";
import { memo, useEffect, useState } from "react";
const { product, productImg, maximumNotice } = styles;

const Product = memo(({ id, title, img, price, quantity, max }: TProduct) => {
  const dispatch = useAppDispatch();

  const [btnDisabled, setBtnDisabled] = useState(false);
  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

  useEffect(() => {
    if (!btnDisabled) {
      return;
    }
    setBtnDisabled(true);

    const timer = setTimeout(() => {
      setBtnDisabled(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [btnDisabled]);

  const handleAddToCart = () => {
    dispatch(addToCart(id));
    setBtnDisabled(true);
  };

  return (
    <div className={product}>
      <div className={productImg}>
        <img src={img} alt={title} />
      </div>
      <h2>{title}</h2>
      <h3>{price.toFixed(2)} EGP</h3>
      <p className={maximumNotice}>
        {quantityReachedToMax
          ? "You reached to the limit"
          : `You can add ${currentRemainingQuantity} item(s)`}{" "}
      </p>
      <Button
        variant="info"
        style={{ color: "white" }}
        onClick={handleAddToCart}
        disabled={btnDisabled || quantityReachedToMax}
      >
        {btnDisabled ? (
          <>
            <Spinner animation="border" size="sm" /> Loading...{" "}
          </>
        ) : (
          "Add to cart"
        )}
      </Button>
    </div>
  );
});

export default Product;
