import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLogin } from "../store/features/appSlice";

const useAuth = (redirectToLogin = false) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("nexusToken") || null
  );
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("nexusUser")) || null
  );
  const { isLogin } = useSelector((state) => state.app);
  const navigate = useNavigate();

  const [loading, setLoadingState] = useState(true);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("nexusToken");
    const storedUser = JSON.parse(localStorage.getItem("nexusUser"));

    if (!loading) {
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
        dispatch(setLogin(true));
      } else if (redirectToLogin) {
        navigate("/login", { replace: true });
      }
    }

    setLoadingState(false);
    dispatch(setLogin(false));
  }, [pathname, dispatch, redirectToLogin, loading, isLogin]);

  const login = (token, user) => {
    localStorage.setItem("nexusToken", token);
    localStorage.setItem("nexusUser", JSON.stringify(user));
    setToken(token);
    setUser(user);
    dispatch(setLogin(true));
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("nexusToken");
    localStorage.removeItem("nexusUser");
    setToken(null);
    setUser(null);
    dispatch(setLogin(false));
    navigate("/");
    window.location.reload();
  };

  return { token, loading, user, login, logout };
};

export default useAuth;
