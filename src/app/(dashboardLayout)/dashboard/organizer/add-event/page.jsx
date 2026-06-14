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
    Select,
    SelectTrigger,
    SelectValue,
    SelectPopover,
    SelectIndicator,
    ListBox,
    ListBoxItem,
    TextArea,
    Label,
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
        try {
            const imageFile = data.banner[0];
            const imageUrl = await uploadImageToImgBB(imageFile);

            const updateData = {
                ...data,
                banner: imageUrl,
                OrganizationEmail: session?.user?.email,
            }
            const result = await addEvents(updateData)
            
            if (JSON.parse(result).insertedId) {
                toast.success('Event Added Successful')
                router.push('/events')
            } else {
                toast.error(result.message || 'Your Free Limit is Over..')
            }
        } catch (error) {
            toast.error('Something went wrong!')
        }
    }

    return (
        <div>
            <DashbordHeading title="Add Event" description="Create new event" />

            <div className="mt-6 max-w-3xl mx-auto">
                <Card
                    className="border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl"
                    radius="lg"
                >
                    <CardHeader className="flex flex-col gap-1 pb-4 border-b border-white/5 p-6">
                        <h3 className="text-xl font-bold text-white">
                            Host a New Event
                        </h3>
                        <p className="text-slate-400 text-xs">
                            Fill out the detailed event information. Banners and dates are
                            required.
                        </p>
                    </CardHeader>

                    <div className="p-6">
                        <Form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4 w-full"
                        >
                            {/* Title + Banner */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="title">
                                        Title
                                    </Label>
                                    <Input
                                        label="Event Title"
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                                        placeholder="e.g. Rock Fest 2026"
                                        {...register("title", {
                                            required: "Event title is required",
                                        })}
                                    />
                                    {errors.title && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.title.message}
                                        </p>
                                    )}
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="image">
                                        Image
                                    </Label>
                                    <Input
                                        {...register("banner", { required: "Banner is Required" })}
                                        type="file"
                                        accept="image/*"
                                        id="logo"
                                        placeholder="https://example.com/avatar.jpg"
                                        
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                                    />
                                    {
                                        errors.banner && <p className="text-red-500">{errors.banner.message}</p>
                                    }
                                    {errors.banner && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.banner.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Category + Location */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                                <div className="w-full">
                                    <Label htmlFor="category">
                                        Category
                                    </Label>
                                    <select
                                        id="category"
                                        {...register("category", { required: "Category is required" })} className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3">
                                        {
                                            CATEGORIES.map(cat => <option key={cat} value={cat}>
                                                {cat}
                                            </option>)
                                        }
                                    </select>

                                    <input
                                        type="hidden"
                                        {...register("category", {
                                            required: "Category is required",
                                        })}
                                    />

                                    {errors.category && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.category.message}
                                        </p>
                                    )}
                                </div>

                                <div className="w-full">
                                    <Label htmlFor="location">
                                        Location
                                    </Label>
                                    <select
                                        id="location"
                                        {...register("location", { required: "Location is required" })} className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3">
                                        {
                                            LOCATIONS.map(loc => <option key={loc} value={loc}>
                                                {loc}
                                            </option>)
                                        }
                                    </select>


                                    <input
                                        type="hidden"
                                        {...register("location", {
                                            required: "Location is required",
                                        })}
                                    />

                                    {errors.location && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.location.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Date + Price + Capacity */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                                <div>
                                    <Label htmlFor="date">
                                        Date
                                    </Label>
                                    <Input
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                                        type="date"
                                        label="Date"
                                        
                                        {...register("date", {
                                            required: "Date is required",
                                        })}
                                    />

                                    {errors.date && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.date.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="price">
                                        Price
                                    </Label>
                                    <Input
                                        className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                                        type="number"
                                        label="Ticket Price ($)"
                                        placeholder="0.00"
                                        {...register("price", {
                                            required: "Price is required",
                                            valueAsNumber: true,
                                            min: {
                                                value: 0,
                                                message: "Price cannot be negative",
                                            },
                                        })}
                                    />

                                    {errors.price && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.price.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="capacity">
                                        Capacity
                                    </Label>
                                    <Input
                                        type="number"
                                        label="Available Capacity"
                                        placeholder="100"
                                        {...register("capacity", {
                                            required: "Capacity is required",
                                            valueAsNumber: true,
                                            min: {
                                                value: 1,
                                                message: "Capacity must be at least 1",
                                            },
                                        })}
                                    />

                                    {errors.capacity && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.capacity.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="w-full">
                                <Label htmlFor="description">
                                    Description
                                </Label>
                                <TextArea
                                    className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                                    label="Detailed Description"
                                    
                                    placeholder="Outline the detailed schedule, speaker list, and amenities..."
                                    {...register("description", {
                                        required: "Description is required",
                                        minLength: {
                                            value: 20,
                                            message:
                                                "Description must be at least 20 characters long",
                                        },
                                    })}
                                />

                                {errors.description && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="submit"
                                className="bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-11 px-6 shadow-lg shadow-pink-500/10"
                                radius="lg"
                            >
                                Host Event Now
                            </Button>
                        </Form>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default AddEventsPage