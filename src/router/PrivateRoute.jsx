import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!token) {
        navigate("/login");
      } else if (token && user?.user_type !== "teacher") {
        navigate("/unauthorized");
      }
    }
  }, [token, user, navigate, loading]);

  // If loading, return null to avoid rendering
  if (loading) return null;

  return <Component {...rest} />;
};

export default PrivateRoute;
