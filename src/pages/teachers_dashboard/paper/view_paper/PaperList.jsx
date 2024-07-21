import PropTypes from "prop-types";
import React, { Component, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import getData from "../../../../helpers/getData";
import { usePaperStore } from "../../../../zustand/store";

const PaperList = ({ goNext }) => {
    const { token, user } = useAuth();
    const setPaper = usePaperStore((state) => state.setPaper);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["getPaperHistory"],
        queryFn: () => getData("get-paper-history", token),
        enabled: !!token,
    });

    return (
        <div className=" grid grid-cols-[auto_1fr] gap-2 mb-4">
            {data?.history?.map((paper) => (
                <button
                    onClick={() => {
                        setPaper(paper);

                        goNext();
                    }}
                >
                    <div
                        key={paper?.id}
                        className="border p-2 rounded-xl shadow-sm bg-primary/10"
                    >
                        <div>
                            <div className=" flex items-center justify-between gap-2 mb-2">
                                <div className=" flex items-center gap-2">
                                    <div className="px-3 py-0.5 mb-2 rounded-full text-[10px] bg-primary/30 border w-fit capitalize">
                                        {paper?.type}
                                    </div>
                                    <div className="px-3 py-0.5 mb-2 rounded-full text-[10px] bg-primary/30  font-semibold border w-fit capitalize">
                                        Date : {paper?.date}
                                    </div>
                                </div>
                                <div>{/* <ViewPeparModal /> */}</div>
                            </div>
                            <div className=" flex items-center gap-4 mb-2">
                                <img
                                    src={paper?.logo}
                                    className="h-14"
                                    alt="school-logo"
                                />
                                <div>
                                    <h1 className=" text-2xl uppercase font-bold">
                                        {paper?.school_name}
                                    </h1>
                                    <h4 className=" capitalize text-sm">
                                        {paper?.address}
                                    </h4>
                                </div>
                            </div>
                            <div className=" flex items-center gap-2">
                                <p className="text-[12px] capitalize bg-gray-500/30 px-4 py-0.5 shadow-md rounded-full ">
                                    std :{" "}
                                    <span className=" font-semibold">
                                        {" "}
                                        {paper?.std}
                                    </span>
                                </p>
                                <p className="text-[12px] capitalize bg-gray-500/30 px-4 py-0.5 shadow-md rounded-full ">
                                    subject :{" "}
                                    <span className=" font-semibold">
                                        {paper?.subject}
                                    </span>
                                </p>
                                <p className="text-[12px] capitalize bg-gray-500/30 px-4 py-0.5 shadow-md rounded-full ">
                                    timing :{" "}
                                    <span className=" font-semibold">
                                        {paper?.timing}
                                    </span>
                                </p>
                                <p className="text-[12px] capitalize bg-gray-500/30 px-4 py-0.5 shadow-md rounded-full ">
                                    division :{" "}
                                    <span className=" font-semibold">
                                        {paper?.division}
                                    </span>
                                </p>
                                <p className="text-[12px] capitalize bg-gray-500/30 px-4 py-0.5 shadow-md rounded-full ">
                                    day :{" "}
                                    <span className=" font-semibold">
                                        {paper?.day}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default PaperList;
