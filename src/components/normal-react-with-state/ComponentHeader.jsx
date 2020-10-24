import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

const ComponentHeader = (props) => {
  const {
    handleChange,
    selectedDepartment,
    selectedPromotionCode,
    inputValue,
    resetProductsOnClick,
  } = props;
  return (
    <>
      <Row className="mb-5">
        <Col md="3" />
        <Col md="6">
          <Card className="py-3" id="page-title">
            <h3 className="text-center">Products table</h3>
          </Card>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md="4" />
        <Col md="4">
          <Form>
            <Form.Control
              id="search"
              type="text"
              disabled={
                selectedDepartment !== "" || selectedPromotionCode !== ""
              }
              onChange={handleChange}
              placeholder={
                selectedDepartment !== "" || selectedPromotionCode !== ""
                  ? "You can't search while filtering"
                  : "Search for a product"
              }
            />
            <i className="fa fa-search position-absolute search-icon" />
          </Form>
        </Col>
        <Col md="2" />
        <Col md="2">
          {selectedDepartment !== "" ||
          selectedPromotionCode !== "" ||
          inputValue !== null ? (
            <Button variant="primary" onClick={resetProductsOnClick}>
              Clear results
            </Button>
          ) : null}
        </Col>
      </Row>
    </>
  );
};

export default ComponentHeader;
