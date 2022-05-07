import Nav from "./Nav";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import {
  FaAddressBook,
  FaPhone,
  FaHeart,
  FaStarOfLife,
  FaShoppingBag,
  FaClipboard,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LOGO from "../../images/logo.png";

const Dashboard = (props) => {
  const nav = [
    {
      path: "/user/dashboard",
      name: "Dashboard",
      icon: <FaClipboard size={25} />,
    },
    {
      path: "/user/orders",
      name: "Orders",
      icon: <FaShoppingBag size={25} />,
    },
    {
      path: "/user/wish-list",
      name: "Wish-List",
      icon: <FaHeart size={25} />,
    },
    {
      path: "/user/change-password",
      name: "Change-Password",
      icon: <FaStarOfLife size={25} />,
    },
    {
      path: "/user/contactus",
      name: "Contact us",
      icon: <FaPhone size={25} />,
    },
    {
      path: "/user/address",
      name: "Address",
      icon: <FaAddressBook size={25} />,
    },
  ];
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div>
      <Nav />
      <main>
        <div className="container">
          <div style={{ marginBottom: "8rem" }} />
          <div className="row">
            <div className="col-md-4">
              <div
                className="card mb-2 shadow-lg"
                style={{ borderRadius: "0rem" }}
              >
                <div className="card-body">
                  <div className="row">
                    <div className="col-3">
                      <img src={LOGO} height="80" className="rounded-circle" />
                    </div>
                    <div className="col-9">
                      {" "}
                      <p className="profile">
                        Hello
                        <h5>
                          <b className="profileusername">{user.name}</b>
                        </h5>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="card shadow-lg mb-3"
                style={{ borderRadius: "0rem" }}
              >
                <div className="card-body">
                  {nav.map((m, i) => (
                    <ul class="list-group">
                      <li
                        key={i}
                        class="list-group-item"
                        style={{ borderRadius: "0rem", padding: "2rem" }}
                      >
                        <Link className="decorate" to={m.path}>
                          <div className="row">
                            <div className="col-2">{m.icon}</div>
                            <div className="col-10">
                              <h4>{m.name}</h4>
                            </div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="card shadow-lg" style={{ borderRadius: "0rem" }}>
                <div className="card-body">
                  <h3 className="dashboardtitle">{props.title}</h3>
                  <hr />
                  {props.children}
                </div>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "10rem" }} />
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Dashboard;
