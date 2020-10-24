import React, { Fragment } from "react";
import { Table } from "react-bootstrap";

const TableWithHooks = (props) => {
  const {
    selectedPromotionCode,
    selectedDepartment,
    products,
    inputValue,
    filterProductsOnCodeClick,
    filterProductsOnDepartmentClick,
  } = props;

  const regex = new RegExp(inputValue, "gi");

  return (
    <Table bordered striped size="sm" id="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Promotion</th>
          <th>
            <span>Promotion code </span>
            {selectedPromotionCode === "" && selectedDepartment === "" ? (
              <span>
                <span>(</span>
                <span className="text-info">click code to filter</span>
                <span>)</span>
              </span>
            ) : (
              <span>
                <span>(</span>
                <span className="text-danger">filter not available</span>
                <span>)</span>
              </span>
            )}
          </th>
          <th>Discounted price</th>
          <th>
            <span>
              Department{" "}
              {selectedPromotionCode === "" && selectedDepartment === "" ? (
                <span>
                  <span>(</span>
                  <span className="text-info">click code to filter</span>
                  <span>)</span>
                </span>
              ) : (
                <span>
                  <span>(</span>
                  <span className="text-danger">filter not available</span>
                  <span>)</span>
                </span>
              )}
            </span>
          </th>
        </tr>
      </thead>
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
                    className={product.hasPromotion ? "pointer" : "text-danger"}
                    id={product.promotionCode ? product.promotionId + 50 : ""}
                    onClick={
                      selectedDepartment === "" &&
                      selectedPromotionCode === "" &&
                      !inputValue
                        ? product.promotionCode
                          ? filterProductsOnCodeClick
                          : null
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
                        ? filterProductsOnDepartmentClick
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
};

export default TableWithHooks;
