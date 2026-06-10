'use server'

import { serverMutation } from "../server"

export const addEvents=async(data)=>{
    // console.log(data,'d')
    const res=await serverMutation('/api/events','POST',data)
    return res;
}
export const updateEvents=async(data,id)=>{
    // console.log(data,'d')
    const res=await serverMutation(`/api/events/${id}`,'PATCH',data)
    return res;
}