import React from "react";
import { Button, Col } from "react-bootstrap";

const ResetButtonWithHooks = (props) => {
  const {
    selectedDepartment,
    selectedPromotionCode,
    resetProductsOnClick,
    inputValue,
  } = props;
  return (
    <Col md="2">
      {selectedDepartment !== "" ||
      selectedPromotionCode !== "" ||
      inputValue !== null ? (
        <Button variant="primary" onClick={resetProductsOnClick}>
          Clear results
        </Button>
      ) : null}
    </Col>
  );
};

export default ResetButtonWithHooks;
