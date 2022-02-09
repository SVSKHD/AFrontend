import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../Components/Layout/Layout";
import {
  fetchProductsByFilter,
  getProductsByCount,
} from "../Components/functions/product";
import { getCategories } from "../Components/functions/category";
import { getSubs } from "../Components/functions/SubCategory";
import ProductCard from "../Components/cards/ProductCard";
import Seo from "../Components/seo/Seo";
import { Input } from "reactstrap";
import ShopBadge from "../Components/Badges/ShopBadge";
import Carousel from "react-grid-carousel";
import { FaStar } from "react-icons/fa";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subIds, setSubIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([
    "Kent",
    "3M",
    "Grundfos",
    "IonExchange",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shipping, setShipping] = useState("");

  let dispatch = useDispatch();

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
    getSubs().then((res) => setSubs(res.data));
    loadAllProducts();
  }, []);

  let { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(20).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  const fetchProducts = (arg) => {
    setLoading(true);
    fetchProductsByFilter(arg).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    // reset
    setCategoryIds([]);
    setPrice(value);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  const showCategories = () => (
    <>
      <div class="filter-contents">
        {categories.map((c, i) => (
          <div key={i} class="mt-2">
            <div class="custom-control custom-checkbox">
              <input
                onChange={handleCheck}
                type="checkbox"
                name=""
                value={c._id}
                checked={categoryIds.includes(c._id)}
                class="custom-control-input"
                id="cat1"
              />
              <label class="custom-control-label" for="cat1">
                {c.name}
              </label>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const showSubs = () => (
    <div class="filter-contents">
      {subs.map((c, i) => (
        <div key={i} class="mt-2">
          <div class="custom-control custom-checkbox">
            <input
              onChange={() => handleSub(c)}
              type="checkbox"
              name=""
              value={c}
              class="custom-control-input"
              id="cat1"
            />
            <label class="custom-control-label" for="cat1">
              {c.name}
            </label>
          </div>
        </div>
      ))}
    </div>
  );

  const handleCheck = (e) => {
    // reset
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }
    setCategoryIds(inTheState);
    // console.log(inTheState);
    fetchProducts({ category: inTheState });
  };

  const handleSub = (sub) => {
    // console.log("SUB", sub);
    setSub(sub);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ sub });
  };

  // showbrands
  const ShowBrands = () =>
    brands.map((b) => (
      <div key={b} class="custom-control custom-checkbox">
        <input
          value={b}
          type="checkbox"
          name={b}
          checked={b === brand}
          onChange={handleBrand}
          class="custom-control-input"
          id="cat11"
        />
        <label class="custom-control-label" for="cat11">
          {b}
        </label>
      </div>
    ));

  const handleBrand = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setColor("");
    setBrand(e.target.value);
    setShipping("");
    fetchProducts({ brand: e.target.value });
  };

  const showShipping = () => (
    <>
      <div class="mt-2">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault1"
            value="Yes"
            checked={shipping === "Yes"}
            onChange={handleShippingchange}
          />
          <label class="form-check-label" for="flexRadioDefault1">
            Yes
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flexRadioDefault"
            id="flexRadioDefault2"
            value="No"
            checked={shipping === "No"}
            onChange={handleShippingchange}
          />
          <label class="form-check-label" for="flexRadioDefault2">
            No
          </label>
        </div>
      </div>
    </>
  );

  const handleShippingchange = (e) => {
    setSub("");
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  const handleStarClick = (num) => {
    // console.log(num);
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");
    fetchProducts({ stars: num });
  };

  const showStars = () => (
    <div className="pr-4 pl-4 pb-2">
      <FaStar starClick={handleStarClick} numberOfStars={5} />
      <FaStar starClick={handleStarClick} numberOfStars={4} />
      <FaStar starClick={handleStarClick} numberOfStars={3} />
      <FaStar starClick={handleStarClick} numberOfStars={2} />
      <FaStar starClick={handleStarClick} numberOfStars={1} />
    </div>
  );

  return (
    <>
      <Layout>
        <Seo
          title={`Aquakart Shop with Best Filters ever | Aquakart.Store`}
          description={`Here you can choose your product with custom filters with your need optimised with wide range of varieties of products are added here with great discounts with immediate delivery.`}
          keywords={`Aquakart Shop with various products List , Grundfos , Kent , Liquiclear , Ao Smith`}
          image={`https://aquakart.store/static/media/Default.9c4634fa.png`}
          url={`${process.env.REACT_APP_URL}/shop`}
        />
        <section className="products-page pt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="h2 main-title text-center fw-bold pb-2 mb-4">
                  All Products
                </div>
              </div>
            </div>
            <div className="row">
              <div
                class="col-md-2 filters collapse collapse-horizontal"
                id="collapseWidthExample"
              >
                <div class="filter-inbox">
                  <div class="inner-filters mt-2">
                    <div class="filter-title d-flex justify-content-between align-items-center">
                      <span class="h6 font-weight-bold mb-0">FILTER BY</span>
                      <span class="clear-filter">
                        <a href="#" class="text-decoration-none text-secondary">
                          <span class="clearall">Clear All</span>
                          <button
                            class="btn btn-transparent close"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseWidthExample"
                            aria-expanded="false"
                            aria-controls="collapseWidthExample"
                          >
                            <i class="bi bi-x-circle"></i>
                          </button>
                        </a>
                      </span>
                    </div>
                  </div>
                  <div class="inner-filters mt-4">
                    <div class="filter-title border-bottom border-secondary">
                      <span class="h6 font-weight-bold mb-0">Price Range</span>
                    </div>
                    <div class="filter-contents">
                      <div class="mt-2">
                        <Input
                          value={price}
                          onChange={(e) => handleSlider(e.target.value)}
                          name="range"
                          type="range"
                          min="0"
                          max="1000000"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="inner-filters mt-4">
                    <div class="filter-title border-bottom border-secondary">
                      <span class="h6 font-weight-bold mb-0">Categories</span>
                    </div>
                    {showCategories()}
                  </div>

                  <div class="inner-filters mt-4">
                    <div class="filter-title border-bottom border-secondary">
                      <span class="h6 font-weight-bold mb-0">
                        Sub-Categories
                      </span>
                    </div>
                    {showSubs()}
                  </div>

                  <div class="inner-filters mt-4">
                    <div class="filter-title border-bottom border-secondary">
                      <span class="h6 font-weight-bold mb-0">
                        CUSTOMER RATINGS
                      </span>
                    </div>
                    <div class="filter-contents">
                      <div class="mt-2">{showStars()}</div>
                    </div>
                  </div>

                  <div class="inner-filters mt-4">
                    <div class="filter-title border-bottom border-secondary">
                      <span class="h6 font-weight-bold mb-0">Brands</span>
                    </div>
                    <div class="filter-contents">
                      <div class="mt-2">{ShowBrands()}</div>
                    </div>
                  </div>

                  <div class="inner-filters mt-4">
                    <div class="filter-title border-bottom border-secondary">
                      <span class="h6 font-weight-bold mb-0">Shipping</span>
                    </div>
                    <div class="filter-contents">{showShipping()}</div>
                  </div>
                </div>
              </div>
              <div className="col-md-10 out-products">
                <hr />
                <Carousel cols={3} rows={1} gap={100} loop>
                  {categories.map((c, i) => (
                    <Carousel.Item key={i}>
                      <ShopBadge name={c.name} to={`/category/${c.slug}`} />
                    </Carousel.Item>
                  ))}
                </Carousel>

                <hr />
                <div className="row">
                  {products.map((product, i) => (
                    <div className="col-md-4">
                      <ProductCard key={i} product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <button
          class="btn btn-theme btn-lg rounded-0 filter-btn"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseWidthExample"
          aria-expanded="false"
          aria-controls="collapseWidthExample"
        >
          <i class="bi bi-filter"></i> Filters
        </button>
      </Layout>
    </>
  );
};
export default Shop;
