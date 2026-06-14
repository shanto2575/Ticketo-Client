import { serverFetch } from "../server"

export const fetchMyBooking=async(email)=>{
    const res=await serverFetch(`/api/events/booking/${email}`)
    return res;
}