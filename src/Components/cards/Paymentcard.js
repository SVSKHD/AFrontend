import { FaHeart, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { addToWishlist } from "../functions/user";

const PaymentCard = ({ product }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const history = useHistory();
  const handleAddToWishlist = (e) => {
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist", { position: "bottom-center" });
      history.push("/user/wish-list");
    });
  };

  const handleRemove = () => {
    // console.log(p._id, "to remove");
    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // [1,2,3,4,5]
      cart.map((product, i) => {
        if (product._id === product._id) {
          cart.splice(i, 1);
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <>
      <div className="card mb-2 shadow">
        <div className="card-body">
          <h4>{product.title}</h4>
          <hr />
          <h5>{product.subtitle}</h5>
          <h6 className="text-success">&#8377;{product.price}</h6>
        </div>
        <div className="card-footer">
          <span onClick={handleAddToWishlist} className="wishlist">
            <FaHeart className="text-danger" />
          </span>{" "}
          &nbsp;
          <span onClick={handleRemove} className="wishlist">
            <FaTrash className="text-secondary" />
          </span>
        </div>
      </div>
    </>
  );
};
export default PaymentCard;
