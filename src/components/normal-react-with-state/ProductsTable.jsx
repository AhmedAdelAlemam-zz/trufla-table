import React, { Component, Fragment } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import DarkMode from "../shared/DarkMode";
import ComponentHeader from "./ComponentHeader";
import TableHead from "../shared/TableHead";
import ReactPaginate from "react-paginate";

class ProductsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      departments: [],
      productsPromotion: [],
      promotions: [],
      selectedDepartment: "",
      selectedPromotionCode: "",
      inputValue: null,
      offset: 0,
      paginationData: [],
      perPage: 10,
      currentPage: 1,
      pageCount: 5,
    };
    this.handleChange = this.handleChange.bind(this);
    this.resetProductsOnClick = this.resetProductsOnClick.bind(this);
  }

  componentDidMount() {
    this.setProducts();
  }

  async setProducts() {
    const result = await axios.get("https://api.mocki.io/v1/c956b99a");
    const data = result.data[0];
    const setData = () => {
      const products = data.products;
      const departments = data.departments;
      const productsPromotion = data.productsPromotions;
      const promotions = data.promotions;
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
      this.setState({
        paginationData: products,
        products: products,
        departments: departments,
        productsPromotion: productsPromotion,
        promotions: promotions,
      });
    };
    setData();
  }

  drawPagination() {
    const {
      selectedDepartment,
      selectedPromotionCode,
      inputValue,
      paginationData,
      offset,
      perPage,
    } = this.state;

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
                          ? this.filterProductsOnCodeClick.bind(
                              this,
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
                          ? this.filterProductsOnDepartmentClick.bind(
                              this,
                              product.id
                            )
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
  }

  handlePageClick = (e) => {
    const { perPage, products } = this.state;
    const selectedPage = e.selected;
    const offset = selectedPage * perPage;
    this.setState({
      currentPage: selectedPage,
      offset: offset,
      pageCount: Math.ceil(products.length / perPage),
    });
  };
  filterProductsOnDepartmentClick(id) {
    this.setState({
      selectedDepartment: document.getElementById(id).innerText,
    });
  }

  filterProductsOnCodeClick(id) {
    this.setState({
      selectedPromotionCode: document.getElementById(id).innerText,
    });
  }

  resetProductsOnClick() {
    this.setState({
      selectedDepartment: "",
      selectedPromotionCode: "",
      inputValue: null,
    });
    document.getElementById("search").value = "";
  }

  handleChange(e) {
    if (e.target.value.length === 0) {
      this.setState({ inputValue: null });
    } else {
      this.setState({ inputValue: e.target.value });
    }
  }

  render() {
    const {
      products,
      selectedDepartment,
      selectedPromotionCode,
      inputValue,
    } = this.state;
    const regex = new RegExp(inputValue, "gi");
    return (
      <Container fluid id="container">
        <DarkMode />
        <Row>
          <Col>
            <ComponentHeader
              handleChange={this.handleChange}
              selectedDepartment={selectedDepartment}
              selectedPromotionCode={selectedPromotionCode}
              inputValue={inputValue}
              resetProductsOnClick={this.resetProductsOnClick}
            />

            {selectedDepartment === "" &&
            selectedPromotionCode === "" &&
            inputValue === null ? (
              <>
                {this.drawPagination()}
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  pageCount={this.state.pageCount}
                  marginPagesDisplayed={5}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName="pagination mb-0 border-0"
                  activeClassName="active"
                  pageClassName="page-item"
                  disabledClassName="disabled text-muted"
                  pageLinkClassName="page-link"
                  previousClassName="page-item page-link"
                  nextClassName="page-item page-link"
                />
              </>
            ) : (
              <Table bordered striped size="sm" id="table">
                <TableHead
                  selectedPromotionCode={selectedPromotionCode}
                  selectedDepartment={selectedDepartment}
                />
                <tbody>
                  {products.map((product, i) => {
                    return (
                      <Fragment key={i}>
                        {product.name.match(regex) ||
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
                              id={
                                product.promotionCode
                                  ? product.promotionId + 50
                                  : ""
                              }
                              onClick={
                                selectedDepartment === "" &&
                                selectedPromotionCode === "" &&
                                !inputValue
                                  ? this.filterProductsOnCodeClick.bind(
                                      this,
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
                            <td
                              className={
                                product.hasPromotion ? "" : "text-danger"
                              }
                            >
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
                                  ? this.filterProductsOnDepartmentClick.bind(
                                      this,
                                      product.id
                                    )
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
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}
export default ProductsTable;
