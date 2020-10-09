import React, { useState, useEffect, Fragment } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);
  return (
    <Base title="ShopME" description="Welcome to the Store">
      <div className="p-4 bg-white">
        <h5 className="text-dark mb-0 align-middle">Latest Products</h5>
      </div>
      <div className="row text-center m-3">
        {products.map((product, index) => {
          return (
            <div key={index} className="col-sm-6 col-md-4 col-lg-3 mt-2 mb-2">
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
}
