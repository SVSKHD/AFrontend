import { useState } from "react";
import { useDispatch  , useSelector} from "react-redux";
import Default from "../../images/logo.png";
import ModalImage from "react-modal-image";
import { toast } from "react-toastify";
import { FaRegHeart, FaHeart  , FaTrash} from "react-icons/fa";
import { addToWishlist } from "../functions/user";
import {useHistory} from "react-router-dom"


const ProductCartCard = ({ p }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  const [color, setColor] = useState(false);

  const handleQuantityChange = (e) => {
    // console.log("available quantity", p.quantity);
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`);
      return;
    }

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
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
        if (product._id === p._id) {
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

  const redirectToLogin = () =>{
    history.push("/signin")
  }

  const handleAddToWishlist = (e) => {
    addToWishlist(p._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist", { position: "bottom-center" });
      history.push("/user/wish-list");
    });
  };

  return (
    <div class="card shadow-lg mb-3">
      <div class="card-body">
        <div class="items">
          <div class="d-flex media">
            <div class="flex-shrink-0">
              {p.images && p.images.length ? (
                <ModalImage small={p.images[0].url} large={p.images[0].url} />
              ) : (
                <ModalImage small={Default} large={Default} />
              )}
            </div>
            <div class="flex-grow-1 ms-3 mt-3">
              <h5 class="mb-3">
                {p.title}
                <span
                  onClick={handleRemove}
                  class="pull-right text-success cursor-pointer"
                >
                  <FaTrash size={25}/>
                </span>
              </h5>
              <div class="d-flex align-items-center justify-content-between prodContents">
                <span>
                  <p class="text-secondary mb-0"><b>{p.title}</b></p>
                </span>
                <span>
                  QTY:{" "}
                  <input
                    type="number"
                    className="form-control"
                    value={p.count}
                    onChange={handleQuantityChange}
                  />
                </span>
                <span>
                  <span class="item-cartPrice fw-bold">&#8377; {p.price}</span>
                </span>
                {user ? (
                  <span
                    onClick={() => handleAddToWishlist()}
                    onMouseEnter={() => setColor(true)}
                    onMouseLeave={() => setColor(false)}
                    className="product-wishlist"
                  >
                    {color ? <FaHeart size={25} /> : <FaRegHeart size={25} />}
                  </span>
                ) : (<span className="product-wishlist" onClick={redirectToLogin}><FaRegHeart size={25} /></span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCartCard;
