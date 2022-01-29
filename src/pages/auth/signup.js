import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import SignupI from "../../images/signup.svg";
// redux
import { auth } from "../../config/firebase";
import { useSelector } from "react-redux";
import { toast, Zoom } from "react-toastify";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(`Email has been sent to ${email} please check it`, {
      theme: "dark",
      position: "bottom-center",
      autoClose: 10000,
      transition: Zoom,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
  };

  return (
    <>
      <Layout>
        <section class="login-page position-relative">
          <div class="container">
            <div class="card shadow">
              <div class="row align-items-center">
                <div class="col-md-6">
                  <div class="login-signup-img">
                    <img src={SignupI} alt="login here" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="login-signup-form">
                    <h1 class="text-center font-weight-bold mb-4">
                      Create Account
                    </h1>
                    <p>
                      Welcome to <span class="text-theme">Aquakart</span> we are
                      excited to see you here.
                    </p>
                    <form onSubmit={handleSubmit} action="" method="post">
                      <div class="form-group">
                        <input
                          type="email"
                          class="form-control"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          name="username"
                          required=""
                        />
                      </div>
                      <div class="text-center">
                        <button
                          type="submit"
                          name="submit"
                          class="btn btn-theme btn-lg rounded-pill px-5"
                        >
                          <i class="bi bi-lock-fill"></i>Sign-up
                        </button>
                      </div>
                      <p class="mt-3 text-secondary">
                        Are you existing user?{" "}
                        <a href="/signin" class="text-decoration-none fw-bold">
                          Sign in
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
    </>
  );
};
export default Signup;
