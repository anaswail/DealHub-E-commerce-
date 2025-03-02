import { Heading } from "@components/common";
import {
  CartItemList,
  CartSubtotalPrice,
  Loading,
} from "@components/eCommerce";
import {
  actGetProductsByItem,
  cartItemChangeQuantity,
  removeItemHandler,
} from "@store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { useCallback, useEffect } from "react";

const Cart = () => {
  const { items, loading, error, productsFullInfo } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actGetProductsByItem());
  }, [dispatch]);

  const products = productsFullInfo.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  const changeItemQuantity = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItem = (id: number) => {
    dispatch(removeItemHandler(id));
  };

  return (
    <>
      <Heading>Cart</Heading>
      <Loading status={loading} error={error}>
        <CartItemList
          products={products}
          changeItemQuantity={changeItemQuantity}
          removeItem={removeItem}
        />
        <CartSubtotalPrice products={products} />
      </Loading>
    </>
  );
};

export default Cart;
