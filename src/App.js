import React, { useEffect, lazy, Suspense } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import LOGO from "./images/logo.png";

// userAuth
import UserRoute from "./routes/UserRoute";
// firebase

import { auth } from "./config/firebase";

// functions
import { currentUser } from "./Components/functions/auth";

// toastify
import { ToastContainer } from "react-toastify";

// libraries
import "bootstrap/dist/css/bootstrap.min.css";
import "react-multi-carousel/lib/styles.css";
import "react-toastify/dist/ReactToastify.css";

// pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/about"));
const Shop = lazy(() => import("./pages/Shop"));
const NotFound = lazy(() => import("./pages/notfound"));
const Cart = lazy(() => import("./pages/cart"));
const Checkout = lazy(() => import("./pages/checkout"));
const Contact = lazy(() => import("./pages/contact"));
const Blog = lazy(() => import("./pages/Blog"));
const Product = lazy(() => import("./pages/product/product"));
const Payment = lazy(() => import("./pages/Payment"));
// Auth
const Signin = lazy(() => import("./pages/auth/signin"));
const Signup = lazy(() => import("./pages/auth/signup"));
const ForgotPassword = lazy(() => import("./pages/auth/forgotPassword"));
const RegistrationComplete = lazy(() =>
  import("./pages/auth/Registrationcomplete")
);
const Slug = lazy(() => import("./pages/categories/slug"));
const SubCategory = lazy(() => import("./pages/SubCategory/SubCategory"));
// user
const userDashboard = lazy(() => import("./pages/user/dashboard"));
const userCart = lazy(() => import("./pages/user/userCart"));
const userWishList = lazy(() => import("./pages/user/wishlist"));
const PasswordUpdate = lazy(() => import("./pages/user/Password"));
const userContact = lazy(() => import("./pages/user/contactus"));
const userAddress = lazy(() => import("./pages/user/Address"));
const userOrders = lazy(() => import("./pages/user/orders"));

function App() {
  const Routes = [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/signin",
      component: Signin,
    },
    {
      path: "/signup",
      component: Signup,
    },
    {
      path: "/registration-complete",
      component: RegistrationComplete,
    },
    {
      path: "/Forgot-password",
      component: ForgotPassword,
    },
    {
      path: "/cart",
      component: Cart,
    },
    {
      path: "/checkout",
      component: Checkout,
    },
    {
      path: "/contact",
      component: Contact,
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: "/shop",
      component: Shop,
    },
    {
      path: "/blog",
      component: Blog,
    },
    {
      path: "/payment",
      component: Payment,
    },
    {
      path: "/product/:slug",
      component: Product,
    },
    {
      path: "/category/:slug",
      component: Slug,
    },
    {
      path: "/sub-category/:slug",
      component: SubCategory,
    },
  ];

  const userRoutes = [
    {
      path: "/user/dashboard",
      component: userDashboard,
    },
    {
      path: "/user/change-password",
      component: PasswordUpdate,
    },
    {
      path: "/user/cart",
      component: userCart,
    },
    {
      path: "/user/orders",
      component: userOrders,
    },
    {
      path: "/user/wish-list",
      component: userWishList,
    },
    {
      path: "/user/address",
      component: userAddress,
    },
    {
      path: "/user/contactus",
      component: userContact,
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);
        // save in DB
        currentUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                address: res.data.address,
                phone: res.data.phone,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <>
      <Suspense
        fallback={
          <>
            <div style={{ textAlign: "center" }}>
              <div style={{ marginBottom: "10rem" }} />
              <img
                style={{ borderRadius: "15rem" }}
                className="shadow-lg img-thumbnail"
                src={LOGO}
                alt="Aquakrt Logo"
              />
              <div style={{ marginBottom: "2rem" }} />
              <span class="text-center loader">
                <span class="loader-inner"></span>
              </span>
            </div>
          </>
        }
      >
        <ToastContainer />
        <Router>
          <Switch>
            {Routes.map((r, i) => (
              <Route key={i} exact path={r.path} component={r.component} />
            ))}
            {userRoutes.map((r, i) => (
              <UserRoute key={i} exact path={r.path} component={r.component} />
            ))}
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </>
  );
}

export default App;
