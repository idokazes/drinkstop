import React from "react";
import Form from "react-bootstrap/Form";

export const CategoriesSelect = ({
  categories,
  setSelectedCategory,
  selectedCategory,
}) => {
  return (
    <Form.Select
      onChange={(e) => setSelectedCategory(e.target.value)}
      value={selectedCategory}
      name="type"
    >
      <option value="">Choose category</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </Form.Select>
  );
};
