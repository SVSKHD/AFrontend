import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import _ from "lodash";
import { addToWishlist } from "../../Components/functions/user";
import { ShowAverage } from "../../Components/functions/Ratings";
import {
  getProduct,
  getRelated,
  productStar,
} from "../../Components/functions/product";
import { toast } from "react-toastify";
import {
  FaHeart,
  FaTimes,
  FaCheckCircle,
  FaWhatsapp,
  FaPhone,
} from "react-icons/fa";
import RelatedCard from "../../Components/cards/RelatedCard";
// images
import { Carousel } from "react-responsive-carousel";
import Default from "../../images/Default.png";
import Seo from "../../Components/seo/Seo"
import ProductSchema from "../../Components/seo/ProductSchema";

const Product = ({ match }) => {
  const [tootltip, setToolTip] = useState("Click to Add");
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState({});
  const [star, setStar] = useState(0);

  const { slug } = match.params;
  const { user, cart } = useSelector((state) => ({ ...state }));
  // dispatch
  const dispatch = useDispatch();
  const history = useHistory();

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
      setToolTip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      dispatch({
        type: "SET_VISIBLE",
        payload: unique,
      });
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist", { position: "bottom-center" });
      history.push("/user/wishlist");
    });
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, star, user.token)
      .then((res) => {
        console.log("rating Clicked", res.data);
        loadSingleproduct();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadSingleproduct();
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  }, [slug]);

  const loadSingleproduct = () => {
    getProduct(slug).then((res) => {
      setProduct(res.data);

      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  return (
    <Layout>
      <Seo
        title={`${product.title} | Aquakart`}
        description={`${product.description}`}
        keywords={`Aquakart , Flipkart , Bathroom Water Softeners , Water RO Purifiers , many more in Regular Use of Home , Best bathroom Softeners in India  ,  Kent bathroom water softener Demo `}
        keyphrase={`Kent Bathroom Softeners , Aquakart Softeners , Automatic Water Softeners , Manual Softeners `}
        image={product.images && product.images.length ? product.images[0].url : Default}
        url={`${process.env.REACT_APP_URL}product/${product.slug}`}
      />
      <ProductSchema
        title={`${product.title} | Aquakart`}
        images={product.images && product.images.length ? product.images[0].url : Default}
        price={product.price}
        stock={product.stock}
        description={product.description}
        rating={product.ratings}
        editor={"Aquakart"}
      />
      <section className="inner-product-page py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <div className="product-gallerySec px-md-4">
                <div className="slider-for">
                  {product.images && product.images.length ? (
                    <Carousel autoPlay dynamicHeight={true}>
                      {product.images &&
                        product.images.map((r, i) => (
                          <div key={i} className="product-large">
                            <img src={r.url} key={r.public_id} />
                          </div>
                        ))}
                    </Carousel>
                  ) : (
                    <div className="card">
                      <div className="card-body">
                        <img src={Default} className="mb-3 img-thumbnail" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 offset-md-1">
              <div className="product-desc">
                <h3 className="product-title fw-bold">{product.title}</h3>
                <div className="d-flex align-items-baseline mt-4">
                  <h3 className="sale-price h5 text-success fw-bold">
                    &#8377; {product.price}
                  </h3>
                  {/* <span className="original-price ms-5 h5 text-danger">
                                        <del>&#8377; 9000</del>
                                    </span> */}
                </div>

                <div className="prod-rating mt-3 h6">
                  <div className="row">
                    <div className="col-md-3">
                      <h5>
                        <strong>Ratings : </strong>
                      </h5>
                    </div>
                    <div className="col-md-9">
                      {product && product.ratings && product.ratings.length > 0
                        ? ShowAverage(product)
                        : "No Ratings Yet"}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="addtoCart my-3">
                  <button
                    onClick={handleAddToCart}
                    className="btn btn-lg btn-theme px-5 m-1"
                  >
                    Add to Cart
                  </button>{" "}
                  &nbsp;
                  {!user ? (
                    <button className="btn btn-lg m-1 btn-danger btnwish  px-5">
                      <Link
                        className="text-decoration-none text-white"
                        to="/signin"
                      >
                        Please Signin
                      </Link>
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className="btn btn-lg btn-outline-danger btnwish  px-5"
                    >
                      <FaHeart size={25} />
                    </button>
                  )}
                  <div className="mb-2" />
                  {!user ? (
                    <button className="btn btn-lg btn-outline-warning btnwish px-5">
                      Please Login to leave Rating
                    </button>
                  ) : (
                    <button className="btn btn-lg btn-outline-warning btnwish px-5">
                      Rate the Product
                    </button>
                  )}
                </div>
                <div className="prod-description pe-md-5 mt-3">
                  <h5>Briefly About Product</h5>
                  <hr />
                  <p><b>{product.description}</b></p>
                </div>
                <hr />
                <h4>Contact Us</h4>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <a
                    href={`https://api.whatsapp.com/send?phone=919182119842&text=Hello We have seen it through Aquakart ${product.title} We need this Product`}
                    target={"_blank"}
                    type="button"
                    className="btn btn-light"
                  >
                    <FaWhatsapp size={30} />
                  </a>
                  <a href="tel:+919182119842" target="_blank" type="button" className="btn btn-light">
                    <FaPhone size={30} />
                  </a>
                </div>
                <hr />
                <div className="prod-specifications mt-3">
                  <h5 className="fw-bold mb-3">Other Specifications</h5>
                  <table className="table border border-secondary rounded">
                    <thead>
                      <tr>
                        <th scope="col">Specification</th>
                        <th scope="col">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Brand</td>
                        <td><b>{product.brand}</b></td>
                      </tr>
                      <tr>
                        <td>Color</td>
                        <td><b>{product.color}</b></td>
                      </tr>
                      <tr>
                        <td>Shipping</td>
                        <td>
                          {product.shipping ? (
                            <FaCheckCircle className="text-success" size={28} />
                          ) : (
                            <FaTimes className="text-danger" size={28} />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>Category</td>
                        {product.category && product.category ? (
                          <td>
                            <Link
                              className="text-decoration-none"
                              to={`/category/${product.category.slug}`}
                            >
                              <h5><span class="badge bg-secondary"> {product.category.name}</span></h5>
                            </Link>
                          </td>
                        ) : (
                          <td>Not categorised yet</td>
                        )}
                      </tr>
                      <tr>
                        <td>Sub-Category</td>
                        {product.subs &&
                          product.subs.map((s, i) => (
                            <td key={i}>
                              <Link to={`/sub-category/${s.slug}`}>
                                <h5><span class="badge bg-dark">{s.name}</span></h5>
                              </Link>
                            </td>
                          ))}
                        <td></td>
                      </tr>
                      <tr>
                        <td>Instock</td>
                        {product.quantity && product.quantity < 50 ? (
                          <td className="text-danger">
                            <b>({product.quantity}) hurry up</b>
                          </td>
                        ) : (
                          <td className="text-info">
                           <b>({product.quantity}) in Stock{" "}</b>
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sl-slider py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="h2 main-title text-center fw-bold pb-2 mb-4">
                Similar Products
              </div>
            </div>
          </div>
          <div className="best">
            <div className="row">
              {related.length > 0
                ? related.map((r, i) => (
                  <div key={i} className="col-md-4 mb-1">
                    <RelatedCard product={r} />
                  </div>
                ))
                : "No Related Products"}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Product;
