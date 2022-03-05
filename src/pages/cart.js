import Layout from "../Components/Layout/Layout";
import { useSelector, useDispatch } from "react-redux";
import ProductCartCard from "../Components/cards/ProductCartCard";
import { userCart } from "../Components/functions/user";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";
import Seo from "../Components/seo/Seo";

const Cart = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const history = useHistory();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  return (
    <>
      <Layout>
      <Seo
        title={`AquaKart | Cart  | Best Budget market`}
        description={`Aquakart is all about your basic home need with the best prices and with all flexible options in payments and many more, avail of our services and rest yourself `}
        keywords={`Aquakart , Flipkart , Aquakart About Us , Bathroom Water Softeners , Water RO Purifiers , many more in Regular Use of Home , Best bathroom Softeners in India  ,  Kent bathroom water siftener Demo`}
        keyphrase={`Aquakaart About Us ,  Kent Bathroom Softeners , Aquakart Softeners , Automatic Water Softeners , Manual Softeners `}
        image={`https://res.cloudinary.com/dcqjrwaoi/image/upload/v1627018401/zytwjcfvx7n7rmgm8uaj.jpg`}
        url={`${process.env.REACT_APP_URL}/cart`}
      />
        <section class="cart-page">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="page-title py-3 text-center h4 fw-bold">
                  Your Cart
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-9">
                <div class="cart-items">
                  {cart.map((c, i) => (
                    <div key={i}>
                      <ProductCartCard p={c} />
                    </div>
                  ))}
                </div>
              </div>
              <div class="col-md-3">
                <div class="calculate-card">
                  <div class="card shadow-sm">
                    <div class="card-body">
                      <h5 class="border-bottom border-secondary mb-3">
                        The amount of
                      </h5>
                      <div class="d-flex align-items-center justify-content-between mb-3  pt-2">
                        <span>
                          <h3 className="totPrice">
                            TOTAL :{" "}
                            <b className="text-success">&#8377; {getTotal()}</b>
                          </h3>
                        </span>
                      </div>

                      {user ? (
                        <>
                          <a
                            onClick={saveCashOrderToDb}
                            disabled={!cart.length}
                            className="btn btn-lg w-100 btn-theme rounded mb-2"
                          >
                            Proceed for Cash on delivery
                          </a>
                          <a
                            onClick={saveOrderToDb}
                            disabled={!cart.length}
                            className="btn btn-lg w-100 btn-theme rounded"
                          >
                            Proceed to Checkout
                          </a>
                        </>
                      ) : (
                        <button
                          className="btn btn-lg w-100 btn-theme rounded"
                          outline
                          color="light"
                        >
                          <Link
                            className="text-decoration-none text-white"
                            style={{}}
                            to={{
                              pathname: "/signin",
                              state: { from: "cart" },
                            }}
                          >
                            Login to Checkout
                          </Link>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <br />
      </Layout>
    </>
  );
};
export default Cart;
