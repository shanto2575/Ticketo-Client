"use client";
import Link from "next/link";

import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form, Select, SelectTrigger, SelectValue, SelectIndicator, SelectPopover, ListBox, ListBoxItem, toast } from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import Logo from "@/components/Logo";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { uploadImageToImgBB } from "@/utils/uploadImage";
import { redirect } from "next/navigation";

export default function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    // console.log(errors)

    const onSubmit = async (data) => {

        const imageFile = data.image[0];
        // console.log(imageFile, 'imageFile')
        const imageUrl = await uploadImageToImgBB(imageFile);

        const { data: signUpdata, error: signUpErrors } = await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
            image: imageUrl,
            role: data.role,
        });
        // console.log(signUpdata, signUpErrors)
        if (signUpErrors) {
            toast.errors('Registration not Success')
        }
        else {
            toast.success('Registration Successful')
            redirect('/')
        }
    }
    return (
        <div>
            <Card className="w-full max-w-lg mx-auto border border-white/5 bg-slate-950/70 backdrop-blur-xl shadow-2xl p-4">
                <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
                    <Logo />
                    <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent">
                        Create an Account
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Join Ticketo to book premium events or host your own organization.
                    </p>
                </CardHeader>
                <CardBody className="gap-4">
                    <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full" >
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                            {...register("name", { required: 'Name is Required' })}
                            id="name"
                            placeholder="Enter your name"
                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                        />
                        {
                            errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>
                        }
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            {...register("email", { required: 'Email is Required' })}
                            id="email"
                            placeholder="Enter You Email"
                            type="email"
                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                        />
                        {
                            errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>
                        }
                        <Label htmlFor="image">Profile Image URL</Label>
                        <Input
                            {...register("image", { required: 'image is Required' })}
                            id="image"
                            type="file"
                            accept="image/*"
                            placeholder="https://example.com/avatar.jpg"
                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                        />
                        {
                            errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>
                        }

                        <Label htmlFor="password">Password</Label>
                        <Input
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Minimum 6 characters required",
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                                    message: "Must include uppercase, lowercase and number",
                                },
                            })}
                            id="password"
                            placeholder="••••••••"
                            type="password"
                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500"
                        />
                        {
                            errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>
                        }
                        <Label htmlFor="role">Select Role</Label>
                        <select
                            {...register("role", {
                                required: "Role is required",
                            })}
                            id='role'
                            className="w-full bg-slate-900/50 border-white/10 hover:border-pink-500/50 focus-within:!border-pink-500 p-3"
                        >
                            <option value="attendee">Attendee</option>
                            <option value="organizer">Organizer</option>
                        </select>
                        {
                            errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>
                        }

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-bold h-12 shadow-lg shadow-pink-500/10 hover:shadow-pink-500/20"
                            radius="lg"
                        >
                            Create Account
                        </Button>
                    </Form>

                    <div className="flex items-center my-4">
                        <div className="flex-grow border-t border-white/5" />
                        <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">Or Sign Up With</span>
                        <div className="flex-grow border-t border-white/5" />
                    </div>

                    <Button
                        variant="bordered"
                        className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 text-white font-semibold h-11"
                        radius="lg"
                        startContent={<FaGoogle className="text-pink-500" />}
                    >
                        Google OAuth
                    </Button>

                    <p className="text-center text-sm text-slate-400 mt-6">
                        Already have an account?{" "}
                        <Link href="/login" className="text-pink-500 hover:text-pink-400 font-semibold hover:underline">
                            Log In
                        </Link>
                    </p>
                </CardBody>
            </Card>
        </div>
    );
}
