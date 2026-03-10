import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Landing from "./screens/Landing";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo?.token ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/landing" element={<Landing />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomeScreen />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
    </Routes>
  );
};

export default App;
