import { baseUrl } from "../baseUrl";
import { serverFetch } from "../server"

export const myEvents=async(email)=>{
    const res=await serverFetch(`/api/events/${email}`)
    return res;
}

export const fetchEvents=async(query)=>{
    const res=await serverFetch(`/api/events?${query}`)
    return res;
}