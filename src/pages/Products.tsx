import { Container } from "react-bootstrap";
import { Loading, Product } from "@components/eCommerce";
import { useAppDispatch, useAppSelector } from "@store/storeHooks";
import { useEffect } from "react";
import { actGetProducts } from "@store/products/productsSlice";
import { useParams } from "react-router-dom";
import { productsCleanUp } from "@store/products/productsSlice";
import { GridList, Heading } from "@components/common";

const Products = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const { records, error, loading } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);

  const productFullInfo = records.map((el) => ({
    ...el,
    quantity: cartItems[el.id] || 0,
  }));

  useEffect(() => {
    dispatch(actGetProducts(params.prefix as string));
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);

  return (
    <Container>
      <Heading>
        <span className="text-capitalize">{params.prefix}</span> Products
      </Heading>
      <Loading status={loading} error={error}>
        <GridList
          records={productFullInfo}
          listItems={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
