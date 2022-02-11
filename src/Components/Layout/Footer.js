import LOGO from "../../images/logo-white.png";
import CategoryList from "../Lists/CategoryList";
import { FaWhatsapp, FaPhone, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <>
      <section class="footer py-3 bg-dark">
        <div class="container">
          <div class="row">
            <div class="col-md-3 mb-2">
              <img src={LOGO} width="100px" alt="Footer Logo" />
              <p class="text-white">
                We have been dealing with Automatic Softeners from years and we
                have the best experince in various brands with various complex
                places to install..We just made a simple process...
                <a href="/about" class="text-decoration-none">
                  Read More
                </a>
              </p>
            </div>
            <div class="col-md-3 mb-2">
              <h5 class="text-white mt-md-2 text-uppercase">Quick Links</h5>
              <div class="white-divider"></div>
              <ul class="list-unstyled mt-3 footer-links">
                <li>
                  <a href="/" class="text-white text-decoration-none">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/" class="text-white text-decoration-none">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/blog" class="text-white text-decoration-none">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/faq" class="text-white text-decoration-none">
                    Faq's
                  </a>
                </li>
                <li>
                  <a href="/contact" class="text-white text-decoration-none">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-md-3 mb-2">
              <h5 class="text-white mt-md-2 text-uppercase">Catgories</h5>
              <div class="white-divider"></div>
              <CategoryList />
            </div>
            <div class="col-md-3 mb-2">
              <h5 class="text-white mt-md-2 text-uppercase">Contact Us</h5>
              <div class="white-divider"></div>
              <ul class="list-unstyled mt-3 footer-links">
                <li>
                  <a
                    href="tel:+91 9988776655"
                    class="text-white text-decoration-none"
                  >
                    <i class="bi bi-telephone-inbound-fill"></i> +91 9182119842
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@aquakart.store"
                    class="text-white text-decoration-none"
                  >
                    <i class="bi bi-envelope-fill"></i> info@aquakart.store
                  </a>
                </li>
                <li>
                  <a href="#" class="text-white text-decoration-none">
                    <i class="bi bi-geo-alt-fill"></i> Attapur, Hyderabad,
                    <br />
                    Telangana - 500048.
                  </a>
                </li>
                <br />
                <div class="btn-group" role="group" aria-label="Basic example">
                  <a
                    href={`https://api.whatsapp.com/send?phone=919182119842&text=Hello We have seen it through Aquakart We just saw the products and need some help in shopping`}
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
              </ul>
            </div>
            <div class="col-md-12 border-top border-light">
              <p class="text-white mb-0 text-center pt-3">
                All Rights Reserved AquaKart © {date}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Footer;
