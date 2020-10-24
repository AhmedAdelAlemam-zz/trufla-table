import React from "react";
import { Col, Form } from "react-bootstrap";

const SearchWithHooks = (props) => {
  const { selectedDepartment, selectedPromotionCode, handleChange } = props;
  return (
    <Col md="4">
      <Form>
        <Form.Control
          id="search"
          type="text"
          disabled={selectedDepartment !== "" || selectedPromotionCode !== ""}
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
  );
};

export default SearchWithHooks;
