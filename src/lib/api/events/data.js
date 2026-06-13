import { baseUrl } from "../baseUrl";
import { serverFetch } from "../server"

export const myEvents=async(email)=>{
    const res=await serverFetch(`/api/events/${email}`)
    return res;
}
// console.log(myEvents,'ldlddld')

// export const SingleEvents=async(id)=>{
//     const res=await serverFetch(`${baseUrl}/api/single-events/${id}`)
//     return res.json();
// }
export const fetchEvents=async()=>{
    const res=await serverFetch('/api/events')
    return res;
}