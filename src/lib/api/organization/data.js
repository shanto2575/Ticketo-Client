import { serverFetch } from "../server"

export const myOrganization=async(email)=>{
    const res=await serverFetch(`/api/organization/${email}`)
    return res;
}