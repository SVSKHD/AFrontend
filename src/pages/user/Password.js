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
      <div className="card">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <label>Password Update</label>
            <br className="mb-3" />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your New password"
              className="form-control"
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
