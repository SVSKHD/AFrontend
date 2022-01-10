import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const WishListCard = ({ name, handleRemove, link }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <Link to={link} className="text-decoration-none text-dark">
          <h5>{name}</h5>
        </Link>
      </div>
      <div className="card-footer">
        <div>
          <button className="btn btn-danger" onClick={handleRemove}>
            <FaTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default WishListCard;
