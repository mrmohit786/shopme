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
      <div className="p-3 bg-white">
        <h5 className="text-dark mb-0 align-middle">Latest Products</h5>
      </div>
      <div className="card-group m-2">
        {products.map((product, index) => {
          return (
            <div key={index} className="col-md-6 col-lg-4 col-xl-3 p-0 mb-2">
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </Base>
  );
}
