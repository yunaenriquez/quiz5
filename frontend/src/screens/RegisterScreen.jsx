import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormComponent from "../components/FormComponent";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { register } from "../features/auth/authSlice";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

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
    setFormError("");

    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    dispatch(register({ name, email, password }));
  };

  return (
    <div className="center-wrap">
      <FormComponent title="Register" onSubmit={submitHandler} submitLabel="Create Account">
        {formError && <Message variant="error">{formError}</Message>}
        {error && <Message variant="error">{error}</Message>}

        <label htmlFor="name">Name</label>
        <input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)} required />

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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />

        {loading && <Loader />}
      </FormComponent>

      <p className="auth-redirect">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterScreen;
