import React from "react";
import { Col, Row } from "react-bootstrap";

const DarkMode = () => {
  const toggleDarkMode = () => {
    const body = document.body;
    const container = document.getElementById("container");
    const toggler = document.getElementById("toggler");
    const table = document.getElementById("table");
    const pageTitle = document.getElementById("page-title");
    body.classList.toggle("bg-dark");
    container.classList.toggle("text-white");
    toggler.classList.toggle("transform");
    table.classList.toggle("table-dark");
    pageTitle.classList.toggle("bg-dark");
    pageTitle.classList.toggle("border-white");
  };

  return (
    <Col md="2">
      <Row>
        <Col md="2">
          <i className="fa fa-sun-o"></i>
        </Col>
        <Col md="1" className="pointer" onClick={toggleDarkMode}>
          <span className="slider round pointer" id="toggler"></span>
        </Col>
        <Col md="2">
          <i className="fa fa-moon-o"></i>
        </Col>
      </Row>
    </Col>
  );
};

export default DarkMode;
