'use client'

import DashbordHeading from '@/components/DashbordHeading'
import { addEvents } from '@/lib/api/events/action'
import { useSession } from '@/lib/auth-client'
import { uploadImageToImgBB } from '@/utils/uploadImage'
import {
    Button,
    Card,
    CardHeader,
    Form,
    Input,
    Textarea,
    Select,
    SelectTrigger,
    SelectValue,
    SelectPopover,
    SelectIndicator,
    ListBox,
    ListBoxItem,
    TextArea,
} from '@heroui/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const AddEventsPage = () => {

    const router = useRouter()
    const { data: session } = useSession()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()

    const CATEGORIES = ['Music', 'Tech', 'Sports', 'Arts', 'Business', 'Food', 'Other']
    const LOCATIONS = ['New York', 'San Francisco', 'London', 'Dhaka', 'Tokyo', 'Berlin', 'Online']

    const onSubmit = async (data) => {
        const imageFile = data.banner[0];
        const imageUrl = await uploadImageToImgBB(imageFile);

        const updateData = {
            ...data,
            banner:imageUrl,
            OrganizationEmail: session?.user?.email,
        }
        const result = await addEvents(updateData)
        // console.log("RESULT:", result.insertedId,typeof JSON.parse(result).insertedId)
        if (JSON.parse(result).insertedId) {
            toast.success('Event Added Successful')
            router.push('/events')
        }
    }

    return (
        <div>
            <DashbordHeading title="Add Event" description="Create new event" />

            <div className="mt-6 max-w-3xl mx-auto">

                <Card className="border border-white/5 bg-slate-900/40 backdrop-blur-xl rounded-2xl">

                    <CardHeader className="flex flex-col gap-1 p-6 border-b border-white/5">
                        <h3 className="text-xl font-bold text-white">
                            Host New Event
                        </h3>
                        <p className="text-slate-400 text-sm">
                            Fill all required fields
                        </p>
                    </CardHeader>

                    <div className="p-6">

                        <Form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                            {/* TITLE + BANNER */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                <div className="space-y-2 flex flex-col">
                                    <label className="text-sm text-slate-300">
                                        Event Title
                                    </label>

                                    <Input
                                        placeholder="Enter event title"
                                        {...register("title", {
                                            required: "Title is required"
                                        })}
                                    />

                                    {errors.title && (
                                        <p className="text-red-500 text-sm">
                                            {errors.title.message}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2 flex flex-col">
                                    <label className="text-sm text-slate-300">
                                        Banner Image URL
                                    </label>

                                    <Input
                                        {...register("banner", { required: 'Banner is Required' })}
                                        id="banner"
                                        type="file"
                                        accept="image/*"
                                        placeholder="https://example.com/avatar.jpg"
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                                    />

                                    {errors.banner && (
                                        <p className="text-red-500 text-sm">
                                            {errors.banner.message}
                                        </p>
                                    )}
                                </div>

                            </div>

                            {/* CATEGORY + LOCATION */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* CATEGORY */}
                                <div className="space-y-2 flex flex-col">

                                    <label className="text-sm text-slate-300">
                                        Category
                                    </label>

                                    <input
                                        type="hidden"
                                        {...register("category", {
                                            required: "Category is required",
                                        })}
                                    />

                                    <Select
                                        onSelectionChange={(keys) => {
                                            const value = Array.from(keys)

                                            setValue("category", value, {
                                                shouldValidate: true,
                                                shouldDirty: true,
                                            })
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select category" />
                                            <SelectIndicator />
                                        </SelectTrigger>

                                        <SelectPopover>
                                            <ListBox>
                                                {CATEGORIES.map((cat) => (
                                                    <ListBoxItem key={cat} id={cat}>
                                                        {cat}
                                                    </ListBoxItem>
                                                ))}
                                            </ListBox>
                                        </SelectPopover>
                                    </Select>

                                    {errors.category && (
                                        <p className="text-red-500 text-sm">
                                            {errors.category.message}
                                        </p>
                                    )}
                                </div>

                                {/* LOCATION */}
                                <div className="space-y-2 flex flex-col">

                                    <label className="text-sm text-slate-300">
                                        Location
                                    </label>

                                    <input
                                        type="hidden"
                                        {...register("location", {
                                            required: "Location is required",
                                        })}
                                    />

                                    <Select
                                        onSelectionChange={(keys) => {
                                            const value = Array.from(keys)

                                            setValue("location", value, {
                                                shouldValidate: true,
                                                shouldDirty: true,
                                            })
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select location" />
                                            <SelectIndicator />
                                        </SelectTrigger>

                                        <SelectPopover>
                                            <ListBox>
                                                {LOCATIONS.map((loc) => (
                                                    <ListBoxItem key={loc} id={loc}>
                                                        {loc}
                                                    </ListBoxItem>
                                                ))}
                                            </ListBox>
                                        </SelectPopover>
                                    </Select>

                                    {errors.location && (
                                        <p className="text-red-500 text-sm">
                                            {errors.location.message}
                                        </p>
                                    )}
                                </div>

                            </div>

                            {/* DATE + PRICE + CAPACITY */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                <div className="space-y-2 flex flex-col">
                                    <label className="text-sm text-slate-300">
                                        Event Date
                                    </label>

                                    <Input
                                        type="date"
                                        {...register("eventDate", {
                                            required: "Date is required"
                                        })}
                                    />
                                </div>

                                <div className="space-y-2 flex flex-col">
                                    <label className="text-sm text-slate-300">
                                        Ticket Price
                                    </label>

                                    <Input
                                        type="number"
                                        placeholder="0"
                                        {...register("ticketPrice", {
                                            required: "Price is required"
                                        })}
                                    />
                                </div>

                                <div className="space-y-2 flex flex-col">
                                    <label className="text-sm text-slate-300">
                                        Capacity
                                    </label>

                                    <Input
                                        type="number"
                                        placeholder="100"
                                        {...register("capacity", {
                                            required: "Capacity is required"
                                        })}
                                    />
                                </div>

                            </div>

                            {/* DESCRIPTION */}
                            <div className="space-y-2 flex flex-col">
                                <label className="text-sm text-slate-300">
                                    Description
                                </label>

                                <TextArea
                                    placeholder="Event details..."
                                    {...register("description", {
                                        required: "Description is required"
                                    })}
                                />

                                {errors.description && (
                                    <p className="text-red-500 text-sm">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            {/* SUBMIT */}
                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11"
                            >
                                Update Event
                            </Button>

                        </Form>
                    </div>

                </Card>
            </div>
        </div>
    )
}

export default AddEventsPage