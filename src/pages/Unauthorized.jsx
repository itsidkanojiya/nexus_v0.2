import React from "react";
import useAuth from "../hooks/useAuth";

const Unauthorized = () => {
  const { token, user } = useAuth();
  return (
    <div>
      <h1>Unauthorized</h1>
    </div>
  );
};

export default Unauthorized;
