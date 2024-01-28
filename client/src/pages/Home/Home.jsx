import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { ProductsGrid } from "../../components/ProductsGrid/ProductsGrid";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { ProductsRows } from "../../components/ProductsRows/ProductsRows";
import "./Home.css";
import InputGroup from "react-bootstrap/InputGroup";
import { CategoriesSelect } from "../../components/CategoriesSelect/CategoriesSelect";

export const Home = ({ products, addToCart, categories }) => {
  const [isGrid, setIsGrid] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log("searchValue", searchValue);

  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(searchValue.toLowerCase()) &&
      (selectedCategory ? product.type === selectedCategory : true)
    );
  });

  return (
    <div id="home">
      <h1>Drink Stop</h1>
      <Container className="center inputs">
        <Form style={{ display: "flex" }}>
          <Form.Label className="main-text" style={{ paddingRight: "10px" }}>
            Grid
          </Form.Label>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Rows"
            className="main-text"
            onChange={() => setIsGrid((current) => !current)}
          />
        </Form>
        <InputGroup className="mb-3">
          <Form.Control
            className="search"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
          />
        </InputGroup>
        <CategoriesSelect
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </Container>
      {isGrid ? (
        <ProductsGrid products={filteredProducts} addToCart={addToCart} />
      ) : (
        <ProductsRows products={filteredProducts} addToCart={addToCart} />
      )}
    </div>
  );
};
