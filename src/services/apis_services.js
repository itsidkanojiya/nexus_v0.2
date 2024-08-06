import { API_URL } from "../components/constants/data";

export async function getSubjects() {
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    try {
        const res = await fetch(`${API_URL}subject`, requestOptions);
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error?.message);
    }
}

export async function getBoards() {
    const requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    try {
        const res = await fetch(`${API_URL}board`, requestOptions);
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error?.message);
    }
}

export async function getBooks() {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const res = await fetch(`${API_URL}books`, requestOptions);
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error?.message);
    }
}

export async function getSolutions() {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    try {
        const res = await fetch(`${API_URL}solutions`, requestOptions);
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error?.message);
    }
}
