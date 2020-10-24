import React from "react";

const TableHead = (props) => {
  const { selectedPromotionCode, selectedDepartment } = props;
  return (
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
  );
};

export default TableHead;
