import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import axios from "axios";
import DarkMode from "../shared/DarkMode";
import SearchWithHooks from "./SearchWithHooks";
import ResetButtonWithHooks from "./ResetButtonWithHooks";
import TableWithHooks from "./TableWithHooks";
import ReactPaginate from "react-paginate";
import TableHead from "../shared/TableHead";

const ProductsTableWithHooks = () => {
  let [products, setProducts] = useState([]);
  let [departments, setDepartments] = useState([]);
  let [productsPromotion, setProductsPromotion] = useState([]);
  let [promotions, setPromotions] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPromotionCode, setSelectedPromotionCode] = useState("");
  const [inputValue, setInputValue] = useState(null);
  const [offset, setOffset] = useState(0);
  const [paginationData, setPaginationData] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(5);

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("https://api.mocki.io/v1/c956b99a");
      const data = result.data[0];
      products = data.products;
      departments = data.departments;
      productsPromotion = data.productsPromotions;
      promotions = data.promotions;

      productsPromotion.map((productPromotion) => {
        products[productPromotion.productId].hasPromotion = true;

        products[productPromotion.productId].discountPrice =
          promotions[productPromotion.promotionId].discountPrice;

        products[productPromotion.productId].active =
          promotions[productPromotion.promotionId].active;

        products[productPromotion.productId].promotionCode =
          promotions[productPromotion.promotionId].code;

        products[productPromotion.productId].promotionId =
          promotions[productPromotion.promotionId].id;
      });
      products.map((product) => {
        product.department = departments[product.department_id].name;
        product.departmentId = departments[product.department_id].id;
      });

      setProducts(products);
      setDepartments(departments);
      setProductsPromotion(productsPromotion);
      setPromotions(promotions);
      setPaginationData(products);
    }
    fetchData();
  }, []);

  const drawPagination = () => {
    const regex = new RegExp(inputValue, "gi");
    const slice = paginationData.slice(offset, offset + perPage);
    const tableData = (
      <Table bordered striped size="sm" id="table">
        <TableHead
          selectedPromotionCode={selectedPromotionCode}
          selectedDepartment={selectedDepartment}
        />
        <tbody>
          {slice.map((product, i) => {
            return (
              <Fragment key={i}>
                {(selectedDepartment === "" &&
                  selectedPromotionCode === "" &&
                  inputValue === null) ||
                product.name.match(regex) ||
                selectedPromotionCode === product.promotionCode ||
                selectedDepartment === product.department ? (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>
                      {product.hasPromotion ? (
                        <i className="fa fa-check text-success" />
                      ) : (
                        <i className="fa fa-close text-danger" />
                      )}
                    </td>
                    <td
                      className={
                        product.hasPromotion ? "pointer" : "text-danger"
                      }
                      id={product.promotionCode ? product.promotionId + 50 : ""}
                      onClick={
                        selectedDepartment === "" &&
                        selectedPromotionCode === "" &&
                        !inputValue
                          ? filterProductsOnCodeClick.bind(
                              product.promotionId + 50
                            )
                          : null
                      }
                      title={
                        selectedPromotionCode === "" &&
                        selectedDepartment === "" &&
                        !inputValue
                          ? "click code to filter"
                          : null
                      }
                    >
                      {product.hasPromotion
                        ? product.promotionCode
                        : "No codes available for this product"}
                    </td>
                    <td className={product.hasPromotion ? "" : "text-danger"}>
                      {product.hasPromotion
                        ? `$${product.discountPrice}`
                        : "This product has no discount"}
                    </td>
                    <td
                      className="pointer"
                      id={product.id}
                      onClick={
                        selectedDepartment === "" &&
                        selectedPromotionCode === "" &&
                        !inputValue
                          ? filterProductsOnDepartmentClick.bind(product.id)
                          : null
                      }
                      title={
                        selectedDepartment === "" &&
                        selectedPromotionCode === "" &&
                        !inputValue
                          ? "click department to filter"
                          : null
                      }
                    >
                      {product.department}
                    </td>
                  </tr>
                ) : null}
              </Fragment>
            );
          })}
        </tbody>
      </Table>
    );
    return tableData;
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;

    setCurrentPage(selectedPage);
    setOffset(offset);
    setPageCount(Math.ceil(products.length / perPage));
  };
  const filterProductsOnDepartmentClick = (e) => {
    const selectedDepartmentText = e.target.innerHTML;
    setSelectedDepartment(selectedDepartmentText);
  };

  const filterProductsOnCodeClick = (e) => {
    const selectedPromotionCodeText = e.target.innerHTML;
    setSelectedPromotionCode(selectedPromotionCodeText);
  };

  const resetProductsOnClick = () => {
    setSelectedDepartment("");
    setSelectedPromotionCode("");
    setInputValue(null);
    document.getElementById("search").value = "";
  };

  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      setInputValue(null);
    } else {
      setInputValue(e.target.value);
    }
  };

  return (
    <Container fluid id="container">
      <DarkMode />
      <Row>
        <Col>
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
            <SearchWithHooks
              selectedDepartment={selectedDepartment}
              selectedPromotionCode={selectedPromotionCode}
              handleChange={handleChange}
            />
            <Col md="2" />
            <ResetButtonWithHooks
              selectedDepartment={selectedDepartment}
              selectedPromotionCode={selectedPromotionCode}
              resetProductsOnClick={resetProductsOnClick}
              inputValue={inputValue}
            />
          </Row>
          {selectedDepartment === "" &&
          selectedPromotionCode === "" &&
          inputValue === null ? (
            <>
              {drawPagination()}
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                pageCount={pageCount}
                marginPagesDisplayed={5}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="pagination float-right"
                activeClassName="active"
                pageClassName="page-item"
                disabledClassName="disabled text-muted"
                pageLinkClassName="page-link"
                previousClassName="page-item page-link"
                nextClassName="page-item page-link"
              />
            </>
          ) : (
            <TableWithHooks
              selectedPromotionCode={selectedPromotionCode}
              selectedDepartment={selectedDepartment}
              products={products}
              inputValue={inputValue}
              filterProductsOnCodeClick={filterProductsOnCodeClick}
              filterProductsOnDepartmentClick={filterProductsOnDepartmentClick}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsTableWithHooks;
