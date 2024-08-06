export const API_URL = "https://backend.nexuspublication.com/api/";

function generateArray(num) {
    if (num < 1) {
        return [];
    } else {
        return Array.from({ length: num }, (_, index) => index + 1);
    }
}

export const standards = generateArray(12);

export const questionsType = [
    { name: "MCQ", value: "mcq" },
    { name: "Fill in the blanks", value: "blanks" },
    { name: "True & false", value: "true_false" },
    { name: "One two line questions", value: "onetwo" },
    { name: "Short question", value: "short" },
    { name: "Long question", value: "long" },
];
export const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
