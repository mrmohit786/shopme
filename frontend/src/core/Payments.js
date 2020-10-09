import React, { useState, useEffect, Fragment } from "react";
import DropIn from "braintree-web-drop-in-react";
import { isAuthenticated } from "../auth/helper";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { createOrder } from "./helper/orderHelper";
const Payments = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      // console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken != null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-block btn-success" onClick={onPurchase}>
              Place Order
            </button>
          </div>
        ) : (
          <h3>
            {!isAuthenticated() && (
              <Link
                to="/signin"
                className="text-white btn btn-block bg-primary"
              >
                Login to checkout
              </Link>
            )}
          </h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");

          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };

          createOrder(userId, token, orderData);
          cartEmpty(() => {
            console.log("Did we got a crash?");
          });

          setReload(!reload);
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <Fragment>
      <div className="row">
        <p className="col-6 text-dark">Total Amount</p>
        <p className="col-6 text-dark">₹{getAmount()}</p>
      </div>
      {showDropIn()}
    </Fragment>
  );
};

export default Payments;
