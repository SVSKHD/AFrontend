import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Dashboard from "../../Components/Layout/dashboard";
import { auth } from "../../config/firebase";

const UserPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        toast.success("Password Updated");
        setLoading(true);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const PasswordForm = () => (
    <>
      <div className="card passwordcard">
        <div className="card-body p-4">
          <h6 className="passwordcardtitle">Change Your Password</h6>
          <form>
            <br className="mb-3" />
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your New password"
              className="form-control"
              style={{ borderRadius: "0rem" }}
              disabled={loading}
            />
            <br className="mb-3" />
            <button
              disabled={!password || password.length < 6 || loading}
              className="btn btn-theme"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );

  return <Dashboard title="Change your Password">{PasswordForm()}</Dashboard>;
};
export default UserPassword;
