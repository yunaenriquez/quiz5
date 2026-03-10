import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormComponent from "../components/FormComponent";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { login } from "../features/auth/authSlice";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo?.token) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="center-wrap">
      <FormComponent title="Login" onSubmit={submitHandler} submitLabel="Sign In">
        {error && <Message variant="error">{error}</Message>}
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        {loading && <Loader />}
      </FormComponent>

      <p className="auth-redirect">
        No account yet? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginScreen;
