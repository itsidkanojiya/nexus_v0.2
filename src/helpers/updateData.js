import { API_ENDPOINT } from "../constants/api_endpoint";

export default async function updateData(endPoint, data, token, method = "POST") {
  const myHeaders = new Headers();

  // Add token if provided
  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }

  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }

  const requestOptions = {
    method,
    headers: myHeaders,
    body: formData,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${API_ENDPOINT}${endPoint}`, requestOptions);
    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    }

    throw new Error(responseData?.message);
  } catch (error) {
    throw new Error(error?.message);
  }
}
