import { Link } from "react-router-dom";
import Dashboard from "../../Components/Layout/dashboard";

const userDashboard = (props) => {
  return (
    <>
      <Dashboard className="Dashboard" title="Dashboard">
        <div className="btn-group" role="group" aria-label="Basic example">
          <button type="button" className="btn btn-theme1">
            <Link className="text-decoration-none text-white" to="/user/orders">
              Orders
            </Link>
          </button>
          <button type="button" className="btn btn-theme1 text-white">
            <Link
              className="text-decoration-none text-white"
              to="/user/wish-list"
            >
              Wish List
            </Link>
          </button>
          <button type="button" className="btn btn-theme1 text-white">
            <Link
              className="text-decoration-none text-white"
              to="/user/address"
            >
              Address
            </Link>
          </button>
          <button type="button" className="btn btn-theme1 text-white">
            <Link
              className="text-decoration-none text-white"
              to="/user/change-password"
            >
              Change Password
            </Link>
          </button>
          <button type="button" className="btn btn-theme1">
            <Link
              className="text-decoration-none text-white"
              to="/user/contactus"
            >
              Contact Us
            </Link>
          </button>
        </div>
      </Dashboard>
    </>
  );
};
export default userDashboard;
