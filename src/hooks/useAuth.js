import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const useAuth = (redirectToLogin = false) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);

    if (!storedToken && redirectToLogin) {
      history.push("/login");
    }
  }, [redirectToLogin, history]);

  const login = (newToken) => {
    localStorage.setItem("nexusToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("nexusToken");
    setToken(null);
  };

  return { token, loading, login, logout };
};

export default useAuth;
