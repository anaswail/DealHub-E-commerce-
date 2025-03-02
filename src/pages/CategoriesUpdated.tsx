import { useAppSelector, useAppDispatch } from "@store/storeHooks";
import { actGetCategories } from "@store/categories/categoriesSlice";

import { Container, Row, Col } from "react-bootstrap";
import { Category } from "@components/eCommerce";
import { useEffect } from "react";

const CategoriesUpdated = () => {
  const { records, loading, error } = useAppSelector(
    (state) => state.categories
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actGetCategories());
  }, [dispatch]);

  const categoriesList =
    records.length > 0
      ? records.map(() => (
          <Col
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            <Category />
          </Col>
        ))
      : "";

  return (
    <Container>
      <Row>{categoriesList}</Row>
    </Container>
  );
};

export default CategoriesUpdated;
