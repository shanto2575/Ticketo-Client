'use server'

import { serverMutation } from "../server"

export const addOrganization=async(data)=>{
    // console.log(data,'d')
    const res=await serverMutation('/api/organization','POST',data)
    return res;
}
export const updateOrganization=async(data,id)=>{
    // console.log(data,'d')
    const res=await serverMutation(`/api/organization/${id}`,'PATCH',data)
    return res;
}