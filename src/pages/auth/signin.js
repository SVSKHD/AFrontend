import { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import Login from "../../images/login.svg";
import { useHistory } from "react-router-dom";
// auth
import { createOrUpdateUser } from "../../Components/functions/auth";
// redux
import { useDispatch, useSelector } from "react-redux";
import { auth, googleAuthProvider } from "../../config/firebase";
// snackbar
import { toast } from "react-toastify"
import { FaGoogle } from "react-icons/fa";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  let dispatch = useDispatch();

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/dashboard");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

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

          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
      toast.success(
        `Succesfully Logged In`,
        {
          position: "bottom-center",
        }
      );
      // history.push("/");
    } catch (error) {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
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
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
                    <img src={Login} alt="login here" />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="login-signup-form">
                    <h1 class="text-center font-weight-bold mb-4">
                      Welcome Back
                    </h1>
                    <form>
                      <div class="form-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div class="form-group">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Your Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          autoFocus
                        />
                      </div>
                      <div class="form-group form-check text-right">
                        <a href="/Forgot-password">
                          <p class="form-check-label" for="exampleCheck1">
                            Forgot Password ?
                          </p>
                        </a>
                      </div>
                      <div class="text-center">
                        <button
                         onClick={handleSubmit}
                          type="submit"
                          name="submit"
                          class="btn btn-theme btn-lg rounded-pill px-5"
                          disabled={!email || !password}
                        >
                          <i class="bi bi-box-arrow-in-right"></i> Login
                        </button>
                        <hr />
                        <button
                          onClick={googleLogin}
                          type="submit"
                          name="submit"
                          class="btn btn-theme btn-lg rounded-pill px-5"
                        >
                          <FaGoogle size={20} />
                          Login With Google
                        </button>
                      </div>
                      <p class="mt-3 text-secondary">
                        Don't Have an account?{" "}
                        <a href="/signup" class="text-decoration-none fw-bold">
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
    </>
  );
};
export default Signin;
