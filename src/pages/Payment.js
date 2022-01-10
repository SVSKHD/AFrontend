import Layout from "../Components/Layout/Layout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Stripe from "../Components/paymentgateway/Stripe";
import { useSelector, useDispatch } from "react-redux";
import PaymentCard from "../Components/cards/Paymentcard";
import {
  createCashOrderForUser,
  emptyUserCart,
} from "../Components/functions/user";

const Payment = ({ history }) => {
  const dispatch = useDispatch();

  const couponTrueOrFalse = useSelector((state) => state.coupon);

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/orders");
        }, 1000);
      }
    });
  };
  const { user, cart, COD } = useSelector((state) => ({ ...state }));
  const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
  return (
    <Layout>
      <div className="mb-1" />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <br />
            <h1>Payment Options</h1>
            <hr />
            <div className="row">
              <div className="col-md-7">
                <h3>Product Summarary</h3>
                <hr />
                <div className="row">
                  {cart.map((c, i) => (
                    <div className="col-md-4" key={i}>
                      <PaymentCard product={c} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-md-5">
                <Elements stripe={promise}>
                  <Stripe />
                </Elements>
                <div className="mb-1" />
                <button
                  onClick={createCashOrder}
                  class="btn btn-lg w-100 btn-theme rounded"
                >
                  Place Cash Order <i class="bi bi-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default Payment;
