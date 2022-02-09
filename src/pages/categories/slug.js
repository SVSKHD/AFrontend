import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../Components/cards/ProductCard";
import { getCategory } from "../../Components/functions/category";
import Layout from "../../Components/Layout/Layout";
import Seo from "../../Components/seo/Seo";
import LOGO from "../../images/logo.png";

const Slug = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      setProducts(res.data.products);
      setCategory(res.data.category);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Layout>
        <div className="m-5">
          <Seo
            title={`${category.name} | AquaKart | Best Budget market`}
            description={`Aquakart is all about your basic home need with the best prices and with all flexible options in payments and many more, avail of our services and rest yourself - ${category.name} `}
            keywords={`${category.name} ,Aquakart , Flipkart , Bathroom Water Softeners , Water RO Purifiers , many more in Regular Use of Home , Best bathroom Softeners in India  ,  Kent bathroom water siftener Demo`}
            keyphrase={`Aquakart-${category.name}-Best Budget market , Kent Bathroom Softeners , Aquakart Softeners , Automatic Water Softeners , Manual Softeners `}
            image={`https://res.cloudinary.com/dcqjrwaoi/image/upload/v1626839719/vvbjezo5crgmmdjanzms.jpg`}
            url={`${process.env.REACT_APP_URL}/category/${category.name}`}
          />
          <div className="container">
            <div className="row">
              <h4>
                {loading ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ marginBottom: "10rem" }} />
                    <img
                      style={{ borderRadius: "15rem" }}
                      className="shadow-lg img-thumbnail"
                      src={LOGO}
                      alt="Aquakrt Logo"
                    />
                    <div style={{ marginBottom: "2rem" }} />
                    <span class="loader">
                      <span class="loader-inner"></span>
                    </span>
                  </div>
                ) : (
                  <h1 className="text-center m-5">
                    {products.length} Products in {category.name}
                  </h1>
                )}
              </h4>
              <hr />
              <div className="row">
                {products.map((p, i) => (
                  <div key={i} className="col-md-4">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Slug;
