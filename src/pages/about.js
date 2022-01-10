import Layout from "../Components/Layout/Layout";
import Seo from "../Components/seo/Seo";
const About = () => {
  return (
    <Layout>
      <Seo />
      <div style={{ marginBottom: "1rem" }} />
      <div className="container">
        <div className="card">
          <div className="card-body shadow-lg">
            <div>
              <h1 className="text-center">About Us</h1>
              <hr />

              <div className="row">
                <div className="col">
                  <h3 className="display-3">Why and What is Aquakart ..?</h3>
                </div>
                <div className="col">
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
                <div className="col">
                  Delivery and installation and any other queries will be solved
                  in time promised to the client, we can initiate delivery and
                  installation on same Day if it is{" "}
                  <b className="display-3">Hyderabad (India)</b>
                </div>
                <div className="col">
                  <h3 className="display-3">Why are we chosen..?</h3>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col">
                  <h3 className="display-3">
                    Here are our Real Time Installations..?
                  </h3>
                </div>
                <div className="col">
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
    </Layout>
  );
};
export default About;
