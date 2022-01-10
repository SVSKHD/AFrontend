import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import ForgotImage from "../../images/login.svg";
import { useHistory } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
// auth
import { auth } from "../../config/firebase";
// notifications

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/login");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        console.log(error.message);
      });
  };
  return (
    <Layout>
      <section class="login-page position-relative">
        <div class="container">
          <div class="card shadow">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="login-signup-img">
                  <img src={ForgotImage} alt="login here" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="login-signup-form">
                  <h1 class="text-center font-weight-bold mb-4">
                    Forgot Password
                  </h1>

                  <form onSubmit={handleSubmit}>
                    <div class="form-group">
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="name@example.com"
                        name="username"
                        value=""
                        required=""
                      />
                    </div>
                    <div class="text-center">
                      <button
                        type="submit"
                        name="submit"
                        class="btn btn-theme btn-lg rounded-pill px-5"
                      >
                        <i class="bi bi-lock-fill"></i> Get Reset Link{" "}
                      </button>
                    </div>
                    <p class="mt-3 text-secondary">
                      Don't Have an account?{" "}
                      <a
                        href="signup.html"
                        class="text-decoration-none fw-bold"
                      >
                        Signup
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default ForgotPassword;
