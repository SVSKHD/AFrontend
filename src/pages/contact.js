import Layout from "../Components/Layout/Layout";
import Contact1 from "../images/contact.jpg";
import Banner from "../images/contact-banner.jpg";
import Seo from "../Components/seo/Seo";
import { FaWhatsapp, FaPhone, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <Layout>
      <Seo
          title={`AquaKart | Contact us here`}
          description={`Aquakart is all about your basic home need with the best prices and with all flexible options in payments and many more, avail of our services and rest yourself `}
          keywords={`Aquakart , Contact us here , Bathroom Water Softeners , Water RO Purifiers , many more in Regular Use of Home , Best bathroom Softeners in India  ,  Kent bathroom water siftener Demo`}
          keyphrase={`Kent Bathroom Softeners ,Aquakart contact us , Contact here , contact form , Aquakart Softeners , Automatic Water Softeners , Manual Softeners `}
          url={`${process.env.REACT_APP_URL}/contact`}
        />
      <section class="static-banner position-relative">
        <img src={Banner} alt="Aquakart banner" class="w-100" />
      </section>
      <section class="pt-5">
        <div class="container contact-page">
          <div class="row">
            <div class="col-md-12">
              <div class="h4 text-center fw-bold my-4">
                Feel free to get in touch with us!
              </div>
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-md-6">
              <div>
                <img src={Contact1} alt="Aquakart Contact" class="w-100" />
              </div>
            </div>
            <div className="col-md-6">
              <div
                class="btn-group align"
                role="group"
                aria-label="Basic example"
              >
                <a
                  href={`https://api.whatsapp.com/send?phone=919182119842&text=Please send us your queries`}
                  target={"_blank"}
                  type="button"
                  className="btn btn-light"
                >
                  <FaWhatsapp size={30} />
                </a>
                <a
                  href="tel:+919182119842"
                  target="_blank"
                  type="button"
                  className="btn btn-light"
                >
                  <FaPhone size={30} />
                </a>
                <a
                  href="https://www.instagram.com/aquakart.co.in"
                  target="_blank"
                  type="button"
                  className="btn btn-light"
                >
                  <FaInstagram size={30} />
                </a>
              </div>
              <div style={{ marginBottom: "2rem" }} />
              <h4 class="fw-bold mb-3">Write to us!</h4>
              <form>
                <div class="mb-3 row">
                  <div class="col-6">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <div class="col-6">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id=""
                    placeholder="Email Subject"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="email"
                    class="form-control"
                    id=""
                    placeholder="Email address"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    id=""
                    placeholder="Enter Mobile "
                  />
                </div>
                <div class="mb-3">
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Explain your query here..."
                  ></textarea>
                </div>
                <div class="mb-3">
                  <button class="btn btn-theme px-4">
                    <i class="bi bi-send"></i> Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <br />
    </Layout>
  );
};
export default Contact;
