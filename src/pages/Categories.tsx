import { useAppSelector, useAppDispatch } from "@store/storeHooks";
import { actGetCategories } from "@store/categories/categoriesSlice";

import { Container } from "react-bootstrap";
import { Category, Loading } from "@components/eCommerce";
import { useEffect } from "react";
import { GridList, Heading } from "@components/common";

const Categories = () => {
  const { records, loading, error } = useAppSelector(
    (state) => state.categories
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!records.length) {
      dispatch(actGetCategories());
    }
  }, [dispatch]);

  return (
    <Container>
      <Heading>Categories</Heading>
      <Loading status={loading} error={error}>
        <GridList
          records={records}
          listItems={(record) => <Category {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Categories;
