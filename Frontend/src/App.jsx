import { Routes, Route, Navigate, useLocation  } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { Loader } from "lucide-react";
import About from "./pages/About";
import Header from "./components/Header";
import AcceptInvite from "./pages/AcceptInvite";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

const RedirectRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  const location = useLocation();  


  useEffect(() => {
    checkAuth();

    // Handle invitation token from URL
    if (location.pathname.startsWith("/invite/")) {
      const token = location.pathname.split("/")[2];
      localStorage.setItem("inviteToken", token);
    }
  }, [location]);


  if (isCheckingAuth) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader className="w-full h-14 text-blue-500 animate-spin" />
      </div>
    );
  }
  

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute> }/>
        <Route path="/register" element={<RedirectRoute><Register /> </RedirectRoute> }/>
        <Route path="/login" element={<RedirectRoute><Login /> </RedirectRoute> }/>
        <Route path="/about" element={<About />} />
        <Route path="/accept-invite/:token" element={<AcceptInvite />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
