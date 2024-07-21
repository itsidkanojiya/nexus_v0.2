import { API_ENDPOINT } from "../constants/api_endpoint";

export default async function updateData(
    endPoint,
    data,
    token,
    method = "POST",
    isJson = false
) {
    const formData = new FormData();
    if (!isJson)
        for (const [key, value] of Object.entries(data)) {
            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    formData.append(`${key}[${index}]`, JSON.stringify(item));
                });
            } else {
                formData.append(key, value);
            }
        }

    const myHeaders = new Headers();
    if (token) {
        myHeaders.append("Authorization", `Bearer ${token}`);
    }
    if (isJson) {
        myHeaders.append("Content-type", "application/json");
    }
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: isJson ? JSON.stringify(data) : formData,
        redirect: "follow",
    };
    console.log(isJson ? JSON.stringify(data) : formData);

    try {
        const response = await fetch(
            `${API_ENDPOINT}${endPoint}`,
            requestOptions
        );
        console.log(response.ok);
        const responseData = await response.json();
        if (response.ok) {
            return responseData;
        }

        throw new Error(responseData?.message);
    } catch (error) {
        throw new Error(error?.message);
    }
}
