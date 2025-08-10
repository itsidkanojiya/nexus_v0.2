import React, { useEffect, useState } from "react";
import InputBox from "../../components/inputs/InputBox";
import useAuth from "../../hooks/useAuth";

const GetSubjects = ({ register, errors }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  useEffect(() => {
    const ac = new AbortController();

    (async () => {
      try {
        // If you need auth, grab your token however you store it:
        // const token = localStorage.getItem("token");
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

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setSelectedSubject(data?.user?.subject ?? "");
      } catch (e) {
        console.error("Failed to fetch user:", e);
        setSelectedSubject("");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, []);

  return (
    <InputBox
      {...(register ? register("subject") : {})}
      errors={errors || {}}
      name="subject"
      label="Subject"
      placeholder={loading ? "Loading..." : selectedSubject || "—"}
      value={selectedSubject}
      readOnly={true}
      disabled={true}
    />
  );
};

export default GetSubjects;
