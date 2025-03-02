import { Row, Col } from "react-bootstrap";

type TGridListProps<T> = {
  records: T[];
  listItems: (record: T) => React.ReactNode;
};

const GridList = <T extends { id?: number }>({
  records,
  listItems,
}: TGridListProps<T>) => {
  const categoriesList =
    records?.length > 0
      ? records.map((record) => (
          <Col
            xs={6}
            md={3}
            key={record.id}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {listItems(record)}
          </Col>
        ))
      : "There are no Categories ):";

  return <Row>{categoriesList}</Row>;
};

export default GridList;
