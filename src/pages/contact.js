import Layout from "../Components/Layout/Layout";
import Contact1 from "../images/contact.jpg";
import Banner from "../images/contact-banner.jpg";
import Seo from "../Components/seo/Seo";
const Contact = () => {
  return (
    <Layout>
      <Seo />
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
            <div class="col-md-6">
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
    </Layout>
  );
};
export default Contact;
