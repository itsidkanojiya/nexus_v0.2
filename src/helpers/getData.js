import { API_ENDPOINT } from "../constants/api_endpoint";

export default async function getData(endPoint, token = null) {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${API_ENDPOINT}${endPoint}`, requestOptions);
    const result = await response.json(); // Parsing response as JSON

    console.log(result);

    if (response.ok) {
      return result;
    }
    throw new Error(result?.message || "Something went wrong");
  } catch (error) {
    throw error; // Re-throwing the error so it can be handled by the calling function
  }
}
