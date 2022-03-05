 import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  applyCoupon,
  createCashOrderForUser,
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  saveUserPhone,
} from "../Components/functions/user";
import Layout from "../Components/Layout/Layout";
import Payment from "../images/we-accept.jpeg";
import { toast } from "react-toastify";
import CheckoutCard from "../Components/cards/CheckoutCard";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [phonesaved, setPhoneSaved] = useState(false);
  const [coupon, setCoupon] = useState("");

  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountedError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const { cart } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);
  console.log("user", user.token);
  useEffect(() => {
    getUserCart(user.token).then((res) => {
      console.log(res);
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

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

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is empty. Continue shopping.", {
        position: "bottom-center",
      });
    });
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const showApplyCoupon = () => (
    <div class="coupon-card">
      <div class="card shadow-sm my-3">
        <div class="card-body  p-3">
          <label class="pb-3">Have a promo code? </label>
          <div class="input-group mb-3">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              class="form-control coupon"
              placeholder="Enter here"
              aria-label="Enter coupon code"
              aria-describedby="button-addon2"
            />
            <div class="input-group-append">
              <button
                onClick={applyDiscountCoupon}
                class="btn btn-outline-secondary coupon-btn"
                type="button"
                id="button-addon2"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // productsummary

  //productmap
  const showProducts = () => {
    return (
      <div className="row">
        {cart.map((p, i) => (
          <div key={i} className="col-md-4">
            <CheckoutCard product={p} />
          </div>
        ))}
      </div>
    );
  };
  // Address
  const saveAddressToDb = () => {
    saveUserAddress(user.token, address).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved", {
          position: "bottom-center",
        });
      }
    });
  };

  const showAddress = () => {
    return (
      <div>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
          className="form-control mb-1"
          id="exampleFormControlTextarea1"
          rows="3"
        />
        <button
          onClick={saveAddressToDb}
          className="btn btn-lg w-100 btn-theme rounded"
        >
          Save Address
        </button>
      </div>
    );
  };

  // Phone
  const showPhone = () => {
    return (
      <div>
        <input
          className="form-control mb-1"
          type="number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Place your Phone No."
        />
        <button
          onClick={SavePhoneToDB}
          className="btn btn-lg w-100 btn-theme rounded"
        >
          Save Phone
        </button>
      </div>
    );
  };

  const SavePhoneToDB = () => {
    saveUserPhone(user.token, phone).then((res) => {
      if (res.data.ok) {
        setPhoneSaved(true);
        toast.success("Phone Saved", {
          position: "bottom-center",
        });
      }
    });
  };

  return (
    <>
      <Layout>
        <section class="cart-page">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="page-title py-3 text-center h4 fw-bold">
                  Checkout
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-9">
                <h4>Contact & Address Details</h4>
                <hr />
                <div className="row">
                  <div className="col">{showAddress()}</div>
                  <div className="col">{showPhone()}</div>
                </div>
                <hr />
                <div class="cart-items">{showProducts()}</div>
              </div>

              <div class="col-md-3">
                <div class="calculate-card mb-3">
                  <div class="card shadow-sm">
                    <div class="card-body">
                      <h5 class="border-bottom border-secondary mb-3">
                        The amount of
                      </h5>

                      <div class="d-flex align-items-center justify-content-between mb-3  pt-2">
                        <span>
                          <h6 class="totPrice">GST (18.0 %)</h6>
                        </span>
                        {/* <span>
                          <h6
                            class="totPrice grandtotal fw-bold"
                            total="8280.00"
                          >
                            &#8377; 414
                          </h6>
                        </span> */}
                      </div>
                      <div class="d-flex align-items-center justify-content-between mb-3  pt-2">
                        {totalAfterDiscount > 0 && (
                          <div>
                            <span>
                              <h6 class="totPrice">Discount (%)</h6>
                            </span>
                            <span>
                              <h6
                                class="totPrice grandtotal fw-bold"
                                total="8280.00"
                              >
                                &#8377; {totalAfterDiscount}
                              </h6>
                            </span>
                          </div>
                        )}
                      </div>
                      <div class="d-flex align-items-center justify-content-between mb-3  pt-2">
                        <span>
                          <h6 class="totPrice">Shipping</h6>
                        </span>
                        <span>
                          <h6
                            class="totPrice grandtotal fw-bold"
                            total="8280.00"
                          >
                            Free
                          </h6>
                        </span>
                      </div>
                      <div class="d-flex align-items-center justify-content-between mb-3  pt-2">
                        <span>
                          <h6 class="totPrice">Total</h6>
                        </span>
                        <span>
                          <h6
                            class="totPrice grandtotal fw-bold"
                            total="8280.00"
                          >
                            &#8377; {total}
                          </h6>
                        </span>
                      </div>

                      {COD ? (
                        <a
                          disabled={
                            !addressSaved || !phonesaved || products.length
                          }
                          onClick={createCashOrder}
                          class="btn btn-lg w-100 btn-theme rounded"
                        >
                          Place Order <i class="bi bi-arrow-right"></i>
                        </a>
                      ) : (
                        <a
                          disabled={
                            !addressSaved || !phonesaved || products.length
                          }
                          onClick={() => history.push("/payment")}
                          class="btn btn-lg w-100 btn-theme rounded"
                        >
                          Place Order <i class="bi bi-arrow-right"></i>
                        </a>
                      )}

                      <div class="we-accept mt-3">
                        <img
                          src={Payment}
                          alt="Aquakart payment methods"
                          class="w-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {showApplyCoupon()}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};
export default Checkout;
