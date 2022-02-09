import Layout from "../Components/Layout/Layout";
import Seo from "../Components/seo/Seo";
import Carousel from "react-grid-carousel";

// images
import AS from "../images/AS.jpg"
import BS from "../images/BS.jpg"
import GS from "../images/GS.jpg"
import ERO from "../images/ERO.jpeg"
import ROW from "../images/ROW.png"
import ROS from "../images/ROS.jpg"

const About = () => {
  const images = [
    {
      name: "AquaKart",
      src: AS
    },
    {
      name: "AquaKart",
      src: BS
    },
    {
      name: "AquaKart",
      src: GS
    },
    {
      name: "AquaKart",
      src: ERO
    },
    {
      name: "AquaKart",
      src: ROW
    },
    {
      name: "AquaKart",
      src: ROS
    },
  ]
  return (
    <Layout>
      <Seo
          title={`AquaKart | About Us | Best Budget market`}
          description={`Aquakart is all about your basic home need with the best prices and with all flexible options in payments and many more, avail of our services and rest yourself `}
          keywords={`Aquakart , Flipkart , Aquakart About Us , Bathroom Water Softeners , Water RO Purifiers , many more in Regular Use of Home , Best bathroom Softeners in India  ,  Kent bathroom water siftener Demo`}
          keyphrase={`Aquakaart About Us ,  Kent Bathroom Softeners , Aquakart Softeners , Automatic Water Softeners , Manual Softeners `}
          image={`https://aquakart.store/static/media/Default.9c4634fa.png`}
          url={`${process.env.REACT_APP_URL}/about`}
        />
      <div>
        <Carousel cols={3} rows={1} gap={10} loop={true} autoplay={8000}>
          {images.map((m, i) => (
            <Carousel.Item key={i}>
              <img height="500" src={m.src} alt={m.name} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div style={{ marginBottom: "1rem" }} />
      <div className="container">
        <div className="card">
          <div className="card-body shadow-lg">
            <div>
              <h1 className="text-center"><b>About Us</b></h1>
              <hr />

              <div className="row">
                <div className="col-md-12 col-lg-6 col-sm-12 mb-4">
                  <h3 className="display-3">Why and What is Aquakart ..?</h3>
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12">
                  <p style={{ fontFamily: "Montserrat" }}>
                    We have been dealing with Automatic Softeners from years and
                    we have the best experince in various brands with various
                    complex places to install.. We just made a simple process to
                    our clients so that they don't get confused and enjoy the
                    out come of softwater.
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-12 col-lg-6 col-sm-12 mb-4">
                  <h3 className="display-3">Why are we chosen..?</h3>
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12">
                  Delivery and installation and any other queries will be solved
                  in time promised to the client, we can initiate delivery and
                  installation on same Day if it is{" "}
                  <b className="display-3">Hyderabad (India)</b>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-md-12 col-lg-6 col-sm-12 mb-4">
                  <h3 className="display-3">
                    Here are our Real Time Installations..?
                  </h3>
                </div>
                <div className="col-md-12 col-lg-6 col-sm-12">
                  <p style={{ fontFamily: "Montserrat" }}>
                    Well if you think we overspoke about ourselves please have a
                    look at our installations in
                    <b className="display-3">Hyderabad</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{marginBottom:'2rem'}}/>
    </Layout>
  );
};
export default About;
