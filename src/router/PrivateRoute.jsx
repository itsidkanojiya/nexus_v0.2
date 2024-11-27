import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Assuming this hook gives the auth data

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token, loading } = useAuth(); // Getting token and loading state from useAuth hook
  const navigate = useNavigate(); // Navigate hook from react-router-dom for navigation
  const [userType, setUserType] = useState(null); // State for storing user type (teacher/student)
  const [isVerified, setIsVerified] = useState(null); // State for storing user verification status
  const [fetching, setFetching] = useState(true); // State to track if data is still being fetched

  // Function to fetch user data from the API
  const fetchUserData = async () => {
    try {
      const response = await fetch(
        "https://backend.nexuspublication.com/api/get-user",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
  
      const data = await response.json(); // Parse JSON response
  
      // Log the full response to verify its structure
      console.log("API Response Data:", data);
  
      // Correctly extract user_type and is_verified from the nested 'user' object
      const userType = data?.user?.user_type;
      const isVerified = data?.user?.is_verified;
  
      console.log("User Type:", userType);  // Logs "teacher" or "student"
      console.log("Is Verified:", isVerified); // Logs 1 (verified) or 0 (unverified)
  
      // Update state with fetched data
      setUserType(userType);
      setIsVerified(isVerified);
  
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/unauthorized"); // Redirect to /unauthorized if fetching fails
    } finally {
      setFetching(false); // Mark fetching as complete
    }
  };
  
  // Fetch user data when token is available
  useEffect(() => {
    if (token) {
      fetchUserData(); // Fetch user data when token is present
    } else {
      setFetching(false); // Stop fetching if no token is present
    }
  }, [token]); // Dependency on token, will trigger fetchUserData when token changes

  // UseEffect to handle navigation logic after data is fetched
  useEffect(() => {
    if (!loading && !fetching) {
      if (!token) {
        navigate("/login"); // Redirect to login if no token
      } else if (userType !== "teacher") {
        navigate("/unauthorized"); // Redirect to unauthorized if user is not a teacher
      } else if (userType === "teacher" && isVerified === 0) {
        navigate("/unverified"); // Redirect to unverified if teacher is not verified
      }
    }
  }, [token, userType, isVerified, navigate, loading, fetching]); // Dependency array to trigger when these values change

  // Render a loading state while fetching user data or loading
  if (loading || fetching || userType === null || isVerified === null) {
    return <div>Loading...</div>; // Show loading until data is available
  }

  // If all conditions pass, render the component
  return <Component {...rest} />;
};

export default PrivateRoute;
