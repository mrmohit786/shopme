import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import "../styles.css";
import Base from "./Base";
import Card from "./card";
import { loadCart } from "./helper/cartHelper";
import Payments from "./Payments";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>Products in cart</h2>
        {products.map((product, index) => (
          <Card
            key={index}
            product={product}
            removefromCart={true}
            addtoCart={false}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  return (
    <Base title="Your Cart" description="Ready to checkout">
      <div className="row d-flex justify-content-center text-center m-3">
        <div className="col-sm-6 col-md-4">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <Fragment>
              <h5 className="text-dark">Your cart is empty!</h5>
              <p className="text-dark">Add items to it now</p>
              <Link to="/" className="btn btn-block btn-primary text-white">
                Shop now
              </Link>
            </Fragment>
          )}
        </div>
        <div className="col-sm-6 col-md-5">
          {products.length > 0 && (
            <Fragment>
              <h5 className="text-dark ">Price Details</h5>
              <Payments products={products} setReload={setReload} />
            </Fragment>
          )}
        </div>
      </div>
    </Base>
  );
};

export default Cart;
