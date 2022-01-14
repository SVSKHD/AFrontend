import { useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { useHistory } from "react-router-dom";
import Login from "../../images/login.svg";
import { toast, Zoom } from "react-toastify"
// functions
import { auth } from "../../config/firebase";
import { createOrUpdateUser } from "../../Components/functions/auth";
// redux
import { useDispatch, useSelector } from "react-redux";

const RegistrationComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

  useState(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    console.log(window.location.href);
    console.log(window.localStorage.getItem("emailForRegistration"));
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error("Email and password is required", {
        position: "bottom-center",
      });
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long", {
        position: "bottom-center",
      });
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
        toast.success(
          `Registration Complete`,
          {
            theme: "dark",
            position: "bottom-center",
            autoClose: 10000,
            transition: Zoom,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        // redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, { 
      theme:"dark",
      position: "bottom-center",  
      autoClose: 10000,
      transition: Zoom,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined, });
    }
  };
  return (
    <Layout>
      <section class="login-page position-relative">
        <div class="container">
          <div class="card shadow">
            <div class="row align-items-center">
              <div class="col-md-6">
                <div class="login-signup-img">
                  <img src={Login} alt="login here" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="login-signup-form">
                  <h1 class="text-center font-weight-bold mb-4">
                    Complete Your Registration
                  </h1>
                  <form onSubmit={handleSubmit}>
                    <div class="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        disabled
                      />
                    </div>
                    <div class="form-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div class="form-group form-check text-right">
                      <a className="text-decoration-none" href="/Forgot-password">
                        <p class="form-check-label" for="exampleCheck1">
                          Forgot Password ?
                        </p>
                      </a>
                    </div>
                    <div class="text-center">
                      <button
                        type="submit"
                        name="submit"
                        class="btn btn-theme btn-lg rounded-pill px-5"
                      >
                        Complete Signup
                      </button>
                      <hr />
                    </div>
                    <p class="mt-3 text-secondary">
                      Have an account?{" "}
                      <a href="/signin" class="text-decoration-none fw-bold">
                        Signin
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
export default RegistrationComplete;
