import React from "react";
import { useQuery } from "@tanstack/react-query";
import getData from "../../helpers/getData";
import SelectBox from "../inputs/SelectBox";

const FilteredGetBoards = ({ handleChange, ...props }) => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["GetBoards"],
        queryFn: () => getData("board"),
    });

    // Filter out "Ncert" from options
    const filteredOptions = data?.boards
        ?.filter((board) => board.name.toLowerCase() !== "ncert")
        .map((board) => ({
            value: board.name,
            label: board.name,
        }));

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <SelectBox
            name="board"
            placeholder="Select Board"
            label="Select Board"
            options={filteredOptions} // Pass filtered options here
            {...props} // Spread other props
        />
    );
};

export default FilteredGetBoards;
