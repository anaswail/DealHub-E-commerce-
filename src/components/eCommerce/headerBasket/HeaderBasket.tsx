import { useAppSelector } from "@store/storeHooks";
import { useEffect, useState } from "react";
import { getCartTotalQuantitySelector } from "@store/cart/cartSlice";
import Logo from "@assets/cart.svg?react";

import styles from "./headerBasket.module.css";
import { useNavigate } from "react-router-dom";
const { basketContainer, basketQuantity, pumpCartQuantity, basketCart } =
  styles;

const HeaderBasket = () => {
  const [isAnimate, setIsAnimate] = useState(false);
  const totalQuantity = useAppSelector(getCartTotalQuantitySelector);
  const quantityStyle = `${basketQuantity} ${
    isAnimate ? pumpCartQuantity : ""
  }`;

  const navigate = useNavigate();

  useEffect(() => {
    if (!totalQuantity) {
      return;
    }
    setIsAnimate(true);

    const debounce = setTimeout(() => {
      setIsAnimate(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [totalQuantity]);

  return (
    <div className={basketContainer} onClick={() => navigate("/cart")}>
      <div className={basketCart}>
        <Logo title="basket icon" />
        <div className={quantityStyle}>{totalQuantity}</div>
      </div>
      <h3>Cart</h3>
    </div>
  );
};

export default HeaderBasket;
