import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../managers/authManager";

export default function Login({ setLoggedInUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password).then((user) => {
      if (!user) {
        setFailedLogin(true);
      } else {
        setLoggedInUser(user);
        if (user.isEmployee) {
          navigate("/admin");
        } else {
          navigate(`/customer/${user.id}`);
        }
      }
    });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="col-sm-4">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className={`form-control ${failedLogin ? "is-invalid" : ""}`}
              value={email}
              onChange={(e) => {
                setFailedLogin(false);
                setEmail(e.target.value);
              }}
            />
            {failedLogin && <div className="invalid-feedback">Invalid email</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              type="password"
              className={`form-control ${failedLogin ? "is-invalid" : ""}`}
              value={password}
              onChange={(e) => {
                setFailedLogin(false);
                setPassword(e.target.value);
              }}
            />
            {failedLogin && <div className="invalid-feedback">Incorrect password</div>}
          </div>
          <button className="btn btn-primary" type="submit" name="action">Login</button>
          <p className="mt-3">
            Not signed up? Register <Link to="/register">here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
