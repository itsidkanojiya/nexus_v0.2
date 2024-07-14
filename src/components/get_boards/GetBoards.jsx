import { useQuery } from "@tanstack/react-query";
import React from "react";
import getData from "../../helpers/getData";
import SelectBox from "../inputs/SelectBox";

const GetBoards = ({ register = {}, errors = {} }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["GetBoards"],
    queryFn: () => getData("board"),
  });

  const options = data?.boards?.map((board) => ({ value: board.name, label: board.name }));

  return (
    <>
      <SelectBox name="board" placeholder="Select Board" label="Select Board" register={register} errors={errors} options={options} />
    </>
  );
};

export default GetBoards;
