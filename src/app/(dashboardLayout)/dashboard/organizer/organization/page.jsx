'use client'
import DashbordHeading from '@/components/DashbordHeading'
import { addOrganization, updateOrganization } from '@/lib/api/organization/action'
import { myOrganization } from '@/lib/api/organization/data'
import { useSession } from '@/lib/auth-client'
import { uploadImageToImgBB } from '@/utils/uploadImage'
import { Button, Card, CardHeader, Form, Input, TextArea } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const OrganizationPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [myOrg, setMyorg] = useState(null)
    const { data: session } = useSession()
    // console.log(session)

    useEffect(() => {
        const setOrgdata = async () => {
            const org = await myOrganization(session?.user?.email)
            setMyorg(org)
        }
        setOrgdata()
    }, [session])
    // console.log(myOrg)

    const onSubmit = async (data) => {
        // console.log(data)
        // return;

        const imageFile = data.logo[0];
        // console.log(imageFile, 'imageFile')
        const imageUrl = await uploadImageToImgBB(imageFile);
        // console.log(imageFile)



        const OrgData = {
            organizationName: data.organizationName,
            logo: imageUrl,
            website: data.website,
            description: data.description,
            organizerEmail: session?.user?.email,
        }
        // console.log(OrgData)

        if (!myOrg) {

            const resdata = await addOrganization(OrgData)
            // console.log(resdata,'resdata')
            if (resdata.insertedId) {
                toast.success('Organization Post successful')
            }
        }
        else {
            const updateres = await updateOrganization(OrgData, myOrg?._id)
            // console.log(resdata,'resdata')
            if (updateres.modifiedCount > 0) {
                toast.success('Organization Post successful')
            }
        }


    }
    return (
        <>
            <DashbordHeading title='My Organization Profile' description='Update organizationName, logo, website, description, organizerEmail' />
            <div className="mt-6 space-y-6 max-w-3xl mx-auto">
                <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl" radius="lg">
                    <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
                        <h3 className="text-xl font-bold text-white">Organization Details</h3>
                        <p className="text-slate-400 text-xs">Review and edit your organization credentials.</p>
                    </CardHeader>
                    <div className="p-6">
                        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                            <Input
                                defaultValue={myOrg?.organizationName}
                                {...register("organizationName", { required: 'organization name is Required' })}
                                id="organizationName" label="Organization Name" placeholder="TechEvents Corp" required className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500" />
                            {
                                errors.organizationName && <p className="text-red-500 text-sm">{errors.organizationName.message}</p>
                            }

                            <Input
                                {...register("logo", { required: 'logo is Required' })}
                                id="logo"
                                type="file"
                                accept="image/*"
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                            />
                            {
                                errors.logo && <p className="text-red-500 text-sm">{errors.logo.message}</p>
                            }

                            <Input
                                defaultValue={myOrg?.website}
                                {...register("website", { required: 'organization Website  is Required' })}
                                id="website" label="Organization Website" placeholder="techevents.corp" required className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500" />
                            {
                                errors.website && <p className="text-red-500 text-sm">{errors.website.message}</p>
                            }

                            <TextArea
                                defaultValue={myOrg?.description}
                                {...register("description", { required: 'Description   is Required' })}
                                id="description" label="Description" placeholder="Hosting global developer conferences and software hacking marathons." required className="w-full bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none min-h-[100px] text-white text-sm" />
                            {
                                errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>
                            }

                            <div className="flex gap-4">
                                <Button type="submit" className="bg-indigo-600 w-full hover:bg-indigo-500 text-white font-bold h-11 px-6 shadow-lg" radius="lg">Save Changes</Button>
                            </div>
                        </Form>
                    </div>
                </Card>
            </div>
        </>
    )
}

export default OrganizationPage