import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCartPlus, FaExternalLinkAlt } from "react-icons/fa";
import Default from "../../images/Default.png";
import { ShowAverage } from "../functions/Ratings";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import _ from "lodash";
import { toast } from "react-toastify";
import { addToWishlist } from "../functions/user";
import {useHistory} from "react-router-dom"

const RelatedCard = ({ product }) => {
  const { title, price, description, images, slug } = product;
  const history = useHistory();
  const [alert, setAlert] = useState("Available");
  const [color , setColor] = useState(false)
  const { user } = useSelector((state) => ({ ...state }));


  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);

  const dispatch = useDispatch();

  // add to cart
  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setAlert("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist", { position: "bottom-center" });
      history.push("/user/wish-list");
    });
  };

  const redirectToLogin = () =>{
    history.push("/signin")
  }

  return (
    <div className="card shadow-sm rounded-3 mx-2">
      <a href={`/product/${slug}`}>
        <img
          src={images && images.length ? images[0].url : Default}
          className="card-img-top"
          alt={title}
        />
      </a>
      <div className="card-body">
        <h4>{title}</h4>
        <div className="d-flex align-items-center justify-content-between p-2">
          <span className="sale-price text-success">
            <b style={{ fontSize: "1.5rem" }}>₹{price}</b>
          </span>
          {/* <span className="org-price text-danger">
                        <del>₹98000</del>
                    </span> */}
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <span className="addcart">
            <button className="btn btn-theme">
              <FaCartPlus size={25} /> Add to Cart
            </button>
            <button className="btn btn-theme1 m-2">
              <Link
                className="text-decoration-none text-white"
                to={`/product/${slug}`}
              >
                <FaExternalLinkAlt size={25} />
              </Link>
            </button>
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
            ):(<span className="product-wishlist" onClick={redirectToLogin}><FaRegHeart size={25}/></span>)}
        </div>
      </div>
    </div>
  );
};
export default RelatedCard;
