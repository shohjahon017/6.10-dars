import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Boards from "./components/Boards";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     setToken(localStorage.getItem("token"));
  //   } else {
  //     if (!location.pathname.includes("register")) {
  //       navigate("/login");
  //     }
  //   }
  // }, []);

  // function ProtectedRoute({ isAthenticated, children }) {
  //   if (!isAthenticated) {
  //     navigate("/login");
  //   }
  //   return children;
  // }

  return (
    <div className="container mx-auto">
      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoute isAthenticated={!!token}>
            <Boards />
            // </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
