import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../../Components/cards/ProductCard";
import { getCategory } from "../../Components/functions/category";
import Layout from "../../Components/Layout/Layout";
import Seo from "../../Components/seo/Seo";
import LOGO from "../../images/logo.png";
import CategoryList from "../../Components/Lists/CategoryList";

const Slug = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(setTimeout(true , 10000));

  const { slug } = match.params;
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setLoading(setInterval(true, 10000));
    getCategory(slug).then((res) => {
      setProducts(res.data.products);
      setCategory(res.data.category);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Layout>
        <div style={{ marginBottom: "2rem" }} />
        <div className="m-5">
          <Seo
            title={`${category.name} | AquaKart | Best Budget market`}
            description={`Aquakart is all about your basic home need with the best prices and with all flexible options in payments and many more, avail of our services and rest yourself - ${category.name} `}
            keywords={`${category.name} ,Aquakart , Flipkart , Bathroom Water Softeners , Water RO Purifiers , many more in Regular Use of Home , Best bathroom Softeners in India  ,  Kent bathroom water siftener Demo`}
            keyphrase={`Aquakart-${category.name}-Best Budget market , Kent Bathroom Softeners , Aquakart Softeners , Automatic Water Softeners , Manual Softeners `}
            image={`https://res.cloudinary.com/dcqjrwaoi/image/upload/v1626839719/vvbjezo5crgmmdjanzms.jpg`}
            url={`${process.env.REACT_APP_URL}/category/${category.name}`}
          />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-xs-12 col-lg-3 col-md-3">
              <img src={LOGO} height="300" alt="Aquakart- Logo" />
              <hr />
              <h1 className="text-center display-3">
                {products.length} Products in {category.name}
              </h1>
              <hr/>
              <CategoryList/>
            </div>
            <div className="col-sm-12 col-xs-12 col-lg-9 col-md-9">
              <div style={{ margin: "10rem" }} />
              {loading ? (
                <div class="d-flex justify-content-center">
                  <div class="spinner-border" role="status"/>
                </div>
              ) : (
                <div className="row">
                  {products.map((p, i) => (
                    <div key={i} className="col-md-4">
                      <ProductCard product={p} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Slug;
