import React, { useState } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addtoCart = true,
  removefromCart = false,
  setReload = (f) => f, //function(f){return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const cartTitle = product ? product.name : "Photo is not uploaded";
  const cartDescription = product ? product.description : "Default Description";
  const cartPrice = product ? product.price : "Default Price";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button onClick={addToCart} className="btn btn-block btn-primary">
          <i className="m-1 fas fa-cart-plus"></i> Add to Cart
        </button>
      )
    );
  };
  const showRemoveFromCart = (removefromCart) => {
    return (
      removefromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger"
        >
          <i class="m-1 fas fa-trash"></i>
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card card-size">
      <div className="card-body">
        {getARedirect(redirect)}
        <ImageHelper product={product} />

        <h6 className="text-primary text-left font-weight-normal text-wrap">
          {cartTitle}
        </h6>
        <p className="text-dark text-left font-weight-normal text-wrap">
          {cartDescription}
        </p>
      </div>
      <div
        className="card-footer"
        style={{ backgroundColor: "white", borderTop: "none" }}
      >
        <div className="row">
          <div className="col-6 text-left text-dark lead">Price</div>
          <div className="col-6 text-right text-dark lead"> ₹{cartPrice} </div>
        </div>
      </div>
      <div
        className="card-footer"
        style={{ backgroundColor: "white", borderTop: "none" }}
      >
        <div className="col-12">{showAddToCart(addtoCart)}</div>
        <div className="col-12">{showRemoveFromCart(removefromCart)}</div>
      </div>
    </div>
  );
};

export default Card;
