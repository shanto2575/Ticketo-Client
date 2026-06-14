import { serverFetch } from "../server"

export const fetchMyPayments=async(email)=>{
    const res=await serverFetch(`/api/payments/${email}`)
    return res;
    
}