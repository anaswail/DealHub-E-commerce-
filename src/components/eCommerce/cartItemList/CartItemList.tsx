import { TProduct } from "src/types/productTypes";
import CartItem from "../cartItem/CartItem";

type TCartItemList = {
  products: TProduct[];
  changeItemQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
};

const CartItemList = ({
  products,
  changeItemQuantity,
  removeItem,
}: TCartItemList) => {
  const renderList = products.map((item) => (
    <CartItem
      key={item.id}
      {...item}
      changeItemQuantity={changeItemQuantity}
      removeItem={removeItem}
    />
  ));
  return <div>{renderList}</div>;
};

export default CartItemList;
