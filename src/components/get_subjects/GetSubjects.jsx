import React from "react";
import InputBox from "../../components/inputs/InputBox";
import { useState, useEffect } from "react";

const GetSubjects = () => {
    const [selectedSubject, setSelectedSubject] = useState("");
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("nexusUser"));
        const selectedSubject = user?.subject || "";
        setSelectedSubject(selectedSubject);
    }, []);
    // Create a dummy register function
    const register = () => {};

    return (
        <InputBox
            errors={{}}
            name="subject"
            placeholder={selectedSubject}
            label="Subject"
            value={selectedSubject}
            readOnly={true}
            disabled={true}
        />
    );
};

export default GetSubjects;
