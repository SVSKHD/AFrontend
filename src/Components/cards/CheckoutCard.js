import { useDispatch, useSelector } from "react-redux";
import Default from "../../images/Default.png";
import { ShowAverage } from "../../Components/functions/Ratings";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { addToWishlist } from "../functions/user";
import { FaTrash, FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const CheckoutCard = ({ product }) => {
  const [color, setColor] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => ({ ...state }));

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
    <div class="card shadow mb-3">
      <div class="card-body">
        <div class="items">
          <div class="d-flex media">
            <div class="flex-shrink-0">
              <img src={product.images[0].url} class="mr-3" alt="item name" />
            </div>
            <div class="flex-grow-1 ms-3 mt-3">
              <h5 class="mb-3">{product.title}</h5>
              <div class="d-flex align-items-center justify-content-between prodContents">
                <span>QTY: {product.count}</span>
                <span>
                  <span class="item-cartPrice fw-bold">
                    &#8377;{product.price}
                  </span>
                </span>
                <span>
                  {user ? (
                    <span
                      onClick={() => handleAddToWishlist()}
                      onMouseEnter={() => setColor(true)}
                      onMouseLeave={() => setColor(false)}
                      className="product-wishlist"
                    >
                      {color ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                    </span>
                  ) : (
                    <span className="product-wishlist">
                      <FaRegHeart size={20} />
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center card-footer">
        {" "}
        <button
          onClick={handleRemove}
          className="btb btn-outline-danger rounded"
        >
          <FaTrash size={25} />
        </button>{" "}
      </div>
    </div>
  );
};
export default CheckoutCard;
