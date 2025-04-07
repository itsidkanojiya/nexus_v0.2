import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
const SubjectChangeRequest = ({ userId }) => {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token, user} = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch subjects
    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await fetch("https://backend.nexuspublication.com/api/subject");
                if (!response.ok) throw new Error("Failed to fetch subjects.");
                const data = await response.json();
                setSubjects(data.subjects);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    // Handle request submission
     // Handle request submission
     const handleRequestChange = async () => {
        if (!selectedSubject) {
            toast.error("Please select a subject.");
            return;
        }
    
        setIsSubmitting(true); // Disable button while submitting
    
        try {
           
            if (!token) {
                toast.error("User is not authenticated!");
                setIsSubmitting(false);
                return;
            }
    
            const response = await fetch("https://backend.nexuspublication.com/api/request-subject-change", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,  // 🔥 Add Bearer token here
                },
                body: JSON.stringify({
                    user_id: user.id,
                    new_subject: String(selectedSubject),
                }),
            });
    
            const result = await response.json(); // Convert response to JSON
    console.log(result);
            if (response.status === 400) {
                toast.error(result.message || "You have already requested a subject change.");
            } else if (!response.ok) {
                throw new Error(result.message || "Failed to submit request.");
            } else {
                toast.success("Request submitted successfully!");
                setSelectedSubject(""); // Reset selection after submission
            }
        } catch (err) {
            toast.error(`Error: ${err.message}`);
        } finally {
            setIsSubmitting(false); // Re-enable button
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center px-2">
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg w-full p-6 md:p-8 space-y-6">
                {/* Heading */}
                <h3 className="text-2xl font-bold text-center uppercase pb-2 border-b-2 text-primary border-dashed">
                    Request Subject Change
                </h3>

                {loading ? (
                    <p className="text-gray-500 text-center">Loading subjects...</p>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    <form className="space-y-4">
                        {/* Subject Dropdown */}
                        <div>
                            <label className="block text-gray-700 font-semibold mb-1">
                                Select Subject
                            </label>
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="">Select a Subject</option>
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.name}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={handleRequestChange}
                            disabled={isSubmitting}
                            className={`w-full py-2 rounded-md font-semibold text-white transition-colors ${
                                isSubmitting
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-primary hover:bg-primary-dark"
                            }`}
                        >
                            {isSubmitting ? "Submitting..." : "Request Change"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default SubjectChangeRequest;
