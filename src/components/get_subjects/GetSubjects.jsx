import React, { useEffect, useState } from "react";
import InputBox from "../../components/inputs/InputBox";
import useAuth from "../../hooks/useAuth";

const GetSubjects = ({ register, errors, setValue }) => {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const ac = new AbortController();

    (async () => {
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

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        console.log("GetSubjects API response:", data);
        const userSubject = data?.user?.subject ?? "";
        console.log("Setting subject to:", userSubject);
        setSelectedSubject(userSubject);

        // Also set the form value so React Hook Form can capture it
        if (setValue && userSubject) {
          console.log("Setting form value for subject:", userSubject);
          // Add a small delay to ensure this happens after PaperDetails useEffect
          setTimeout(() => {
            console.log(
              "Setting form value for subject (delayed):",
              userSubject
            );
            setValue("subject", userSubject);
          }, 100);
        }
      } catch (e) {
        console.error("Failed to fetch user:", e);
        setSelectedSubject("");
      } finally {
        setLoading(false);
      }
    })();

    return () => ac.abort();
  }, [setValue]);

  return (
    <InputBox
      {...register("subject")}
      errors={errors || {}}
      name="subject"
      label="Subject"
      placeholder={loading ? "Loading..." : selectedSubject || "—"}
      value={selectedSubject}
      readOnly={false}
      disabled={false}
      onChange={(e) => {
        console.log("Subject field changed to:", e.target.value);
        setSelectedSubject(e.target.value);
      }}
    />
  );
};

export default GetSubjects;
