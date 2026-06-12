import { serverFetch } from "../server"

export const myEvents=async(email)=>{
    const res=await serverFetch(`/api/events/${email}`)
    return res;
}
// console.log(myEvents,'ldlddld')