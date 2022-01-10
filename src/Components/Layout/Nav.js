import LOGO from "../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

const Nav = () => {
  let dispatch = useDispatch();
  let history = useHistory();
  let { user, cart } = useSelector((state) => ({ ...state }));

  const navitems = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/about",
      name: "About",
    },
    {
      path: "/products",
      name: "products",
    },
    {
      path: "/blog",
      name: "Blog",
    },
    {
      path: "/contactus",
      name: "Contact Us",
    },
  ];

  const userNav = [
    {
      path: "/user/dashboard",
      name: "Dashboard",
    },
  ];
  const Logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/signin");
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md navbar-light fixed-top py-0 shadow">
          <div className="container">
            <a className="navbar-brand py-2" href="/">
              <img src={LOGO} alt="Aquakart LOGO" />
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/shop">
                    Shop
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/blog">
                    Blog
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/contact">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div className="nav-items d-inline">
              {!user && (
                <span className="login">
                  <a href="/signin">Login</a>
                </span>
              )}
              {user && (
                <div class="nav-items d-inline">
                  <div class="dropdown d-inline profile">
                    <a
                      class="btn bg-theme dropdown-toggle shadow-none"
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i class="bi bi-person-circle"></i>{" "}
                      {user.email && user.email.split("@")[0]}
                    </a>

                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li>
                        <a class="dropdown-item" href="/user/dashboard">
                          <i class="bi bi-person-badge"></i> My Account
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/user/orders">
                          <i class="bi bi-bag"></i> My Orders
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/user/address">
                          <i class="bi bi-geo-alt"></i> Manage Address
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/user/wish-list">
                          <i class="bi bi-heart"></i> Wishlist
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="/user/coupons">
                          <i class="bi bi-percent"></i> Coupons
                        </a>
                      </li>
                      <li>
                        <button
                          onClick={Logout}
                          class="btn btn-danger dropdown-item"
                        >
                          <i class="bi bi-box-arrow-right"></i> Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              <span className="cart">
                <a href="/cart">
                  <i className="bi bi-cart2"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill">
                    {cart.length}
                  </span>
                </a>
              </span>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Nav;
