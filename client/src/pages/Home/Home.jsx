import { useEffect, useState } from "react";
import { BASE_URL } from "../../constants";
import { ProductsGrid } from "../../components/ProductsGrid/ProductsGrid";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import { ProductsRows } from "../../components/ProductsRows/ProductsRows";
import "./Home.css";
import InputGroup from "react-bootstrap/InputGroup";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [isGrid, setIsGrid] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch(BASE_URL + "/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

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
      </Container>
      {isGrid ? (
        <ProductsGrid products={products} />
      ) : (
        <ProductsRows products={products} />
      )}
    </div>
  );
};
