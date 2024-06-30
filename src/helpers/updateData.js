import { API_ENDPOINT } from "../constants/api_endpoint";

export default async function updateData(endPoint, data = null, token = null) {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Content-Type", "application/json");

  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }

  const requestOptions = {
    method: method,
    headers: myHeaders,
    redirect: "follow",
  };

  if (data) {
    requestOptions.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_ENDPOINT}${endPoint}`, requestOptions);
    if (response.ok) {
      return result;
    }
    throw new Error(result?.message || "Something went wrong");
  } catch (error) {
    throw error;
  }
}
