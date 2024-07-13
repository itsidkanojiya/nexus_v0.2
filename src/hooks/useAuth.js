import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setLogin } from "../store/features/appSlice";

const useAuth = (redirectToLogin = false) => {
  const [token, setToken] = useState(() => localStorage.getItem("nexusToken") || null);
  const [loading, setLoadingState] = useState(true);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem("nexusToken");
    if (storedToken) {
      setToken(storedToken);
      dispatch(setLogin(true));
    } else if (redirectToLogin) {
      history.push("/login");
    }
    setLoadingState(false);
    dispatch(setLogin(false));
  }, [pathname, dispatch, redirectToLogin]);

  const login = (newToken) => {
    localStorage.setItem("nexusToken", newToken);
    setToken(newToken);
    dispatch(setLogin(true));
  };

  const logout = () => {
    localStorage.removeItem("nexusToken");
    setToken(null);
    dispatch(setLogin(false));
  };

  return { token, loading, login, logout };
};

export default useAuth;
