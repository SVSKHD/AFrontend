import Dashboard from "../../Components/Layout/dashboard";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const userContact = () => {
  return (
    <Dashboard title="Contact Us">
      <div className="row">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <div
                className="btn-group"
                role="group"
                aria-label="Basic example"
              ></div>
            </div>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </Dashboard>
  );
};
export default userContact;
