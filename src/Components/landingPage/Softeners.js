import { useEffect, useState } from "react";
import Carousel from "react-grid-carousel";
import ProductCard from "../cards/ProductCard";
import { getCategory } from "../functions/category";
import { Spinner } from "reactstrap";

const Softeners = (props) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    getCategory("softeners").then((res) => {
      setProducts(res.data.products);
      setLoading(false);
    });
  };

  return (
    <>
      {loading ? (
        <>
          <Carousel cols={3} rows={1} gap={10} loop>
            {products.map((i) => (
              <Carousel.Item key={i}>
                <Spinner className="text-center">Loading...</Spinner>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      ) : (
        <Carousel cols={3} rows={1} gap={10} loop={true} autoplay={3000}>
          {products.map((p, i) => (
            <Carousel.Item key={i}>
              <ProductCard product={p} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};
export default Softeners;
