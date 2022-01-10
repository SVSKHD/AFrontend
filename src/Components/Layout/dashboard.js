import Nav from "./Nav";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const nav = [
    {
      path: "/user/dashboard",
      name: "Dashboard",
    },
    {
      path: "/user/orders",
      name: "Orders",
    },
    {
      path: "/user/wish-list",
      name: "Wish-List",
    },
    {
      path: "/user/change-password",
      name: "Change-Password",
    },
    {
      path: "/user/contactus",
      name: "Contact us",
    },
    {
      path: "/user/address",
      name: "Address",
    },
  ];
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      <Nav />
      <main>
        <div className="container">
          <div style={{ marginBottom: "6rem" }} />
          <h1>
            <b className="username-welcome">Hello</b>{" "}
            <b className="username">{user.name}</b>
          </h1>
          <hr />
          <div className="row">
            <div className="col col-md-4 col-lg-4">
              <div className="card mb-2">
                <div className="card-body">
                  <ul className="list-unstyled mt-3 footer-links">
                    {nav.map((items, i) => (
                      <Link
                        className="text-decoration-none"
                        key={i}
                        to={items.path}
                      >
                        <li className="list-group-item">
                          <b>{items.name}</b>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col col-md-8 col-lg-8">
              <div className="card shadow-lg">
                <div className="card-body">
                  <h1>{props.title}</h1>
                  <hr />
                  <div className="container">{props.children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginBottom: "2rem" }} />
      </main>
      <Footer />
    </div>
  );
};
export default Dashboard;
