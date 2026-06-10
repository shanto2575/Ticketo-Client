import { baseUrl } from "./baseUrl"

export const serverMutation = async (path, method, data) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const text = await res.text();

    // console.log("Response Text:", text);

    return text;
};

export const serverFetch = async (path) => {
    const res = await fetch(`${baseUrl}${path}`)
    return res.json()
}