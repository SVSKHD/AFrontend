import Layout from "../Components/Layout/Layout";
// imgaes
import IMG1 from "../images/slide-1.jpg";
import IMG2 from "../images/slide-2.jpg";
import IMG3 from "../images/slide-3.jpg";
// imgaes
import IMG4 from "../images/delivery.png";
import IMG5 from "../images/medal.png";
import IMG6 from "../images/maintenance.png";
import IMG7 from "../images/support.png";
import RoFilters from "../Components/landingPage/ROfilters";
import Softeners from "../Components/landingPage/Softeners";
// seo
import Seo from "../Components/seo/Seo";
import LandingPageSchema from "../Components/seo/LandingPageSchema";

const Home = () => {
  return (
    <>
      <Layout>
        <Seo
          title={`AquaKart | Best Budget market`}
          description={`Aquakart is all about your basic home need with the best prices and with all flexible options in payments and many more, avail of our services and rest yourself `}
          keywords={`Aquakart , Flipkart , Bathroom Water Softeners , Water RO Purifiers , many more in Regular Use of Home , Best bathroom Softeners in India  ,  Kent bathroom water siftener Demo`}
          keyphrase={`Kent Bathroom Softeners , Aquakart Softeners , Automatic Water Softeners , Manual Softeners `}
          image={`https://aquakart.store/static/media/Default.9c4634fa.png`}
          url={process.env.REACT_APP_URL}
        />
        <LandingPageSchema />
        <section className="slider-sec">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={IMG1} className="d-block w-100" alt="..." />
                <a href="/shop" className="stretched-link"></a>
              </div>
              <div className="carousel-item">
                <img src={IMG2} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={IMG3} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>
        <section className="py-5 features">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <div className="f-box text-center">
                  <div className="f-icon">
                    <img src={IMG5} />
                  </div>
                  <div className="h5 mt-3 fw-bold text-dark">
                    Quality Assured
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="f-box text-center">
                  <div className="f-icon">
                    <img src={IMG4} />
                  </div>
                  <div className="h5 mt-3 fw-bold text-dark">Fast Shipping</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="f-box text-center">
                  <div className="f-icon">
                    <img src={IMG6} />
                  </div>
                  <div className="h5 mt-3 fw-bold text-dark">Maintenance</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="f-box text-center">
                  <div className="f-icon">
                    <img src={IMG7} />
                  </div>
                  <div className="h5 mt-3 fw-bold text-dark">24/7 Support</div>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-5" />
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div class="h2 main-title text-center fw-bold pb-2 mb-4">
                  Softeners
                </div>
                <Softeners />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div class="h2 main-title text-center fw-bold pb-2 mb-4">
                  RO Filters
                </div>
                <RoFilters />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};
export default Home;
