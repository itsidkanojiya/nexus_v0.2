import { useQuery } from "@tanstack/react-query";
import React from "react";
import getData from "../../helpers/getData";

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["books"],
    queryFn: () => getData("books"),
  });
  return <div>Home</div>;
};

export default Home;
