import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const WishListCard = ({ name, handleRemove, link }) => {
  return (
    <div className="card mb-3 shadow-lg" style={{ borderRadius: "0rem" }}>
      <div className="card-body">
        <Link to={link} className="text-decoration-none text-dark">
          <h5 className="wishListCard">{name}</h5>
        </Link>
      </div>
      <div className="card-footer" style={{ backgroundColor: "white" }}>
        <div>
          <button
            className="btn btn-link"
            style={{ textAlign: "right" }}
            onClick={handleRemove}
          >
            <FaTrash className="text-danger" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default WishListCard;
