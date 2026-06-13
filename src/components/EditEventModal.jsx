"use client";

import { Button, Form, Input, Label, Modal, TextArea } from "@heroui/react";
import { useForm } from "react-hook-form";
import { uploadImageToImgBB } from "@/utils/uploadImage";
import { updateEvents } from "@/lib/api/events/action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CATEGORIES = [
  "Music",
  "Tech",
  "Sports",
  "Arts",
  "Business",
  "Food",
  "Other",
];

const LOCATIONS = [
  "New York",
  "San Francisco",
  "London",
  "Dhaka",
  "Tokyo",
  "Berlin",
  "Online",
];

const EditEventModal = ({ isModalOpen, setIsModalOpen, editingEvent }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

 
  const onSubmit = async (data) => {
  try {
    const updateData = {
      ...data,
    };

    // image update
    if (data?.banner?.length > 0) {
      const imageFile = data.banner[0];
      const imageUrl = await uploadImageToImgBB(imageFile);
      updateData.banner = imageUrl;
    } else {
      updateData.banner = editingEvent?.banner;
    }

    // API Call
    const result = await updateEvents(updateData, editingEvent?._id);

    if (result || result?.modifiedCount >= 0) {
      toast.success("Event Updated Successfully");
      setIsModalOpen(false); 
      router.refresh();
    } else {
      toast.error("Failed to update event");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
};

  const inputClass = "w-full bg-slate-900/50 border border-white/10 text-white rounded-xl focus-within:!border-pink-500/80 transition-all duration-300";
  const selectClass = "w-full p-3 bg-slate-900/50 border border-white/10 text-white rounded-xl focus:border-pink-500/80 focus:outline-none transition-all duration-300 appearance-none";

  return (
    <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="dark text-white bg-slate-950 border border-white/5 backdrop-blur-2xl p-2 rounded-3xl w-full max-w-4xl mx-auto shadow-2xl shadow-pink-500/5">
            <div className="p-6">
              
              {/* Modal Header */}
              <div className="mb-6 pb-4 border-b border-white/5">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  Edit Event Details
                </h3>
                <p className="text-slate-400 text-sm mt-1">Make changes to your existing event information.</p>
              </div>

              <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
                
                {/* 2-Column Responsive Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                  
                  {/* Title */}
                  <div className="flex flex-col space-y-2">
                    <Label className="text-slate-300 text-sm font-medium">Event Title</Label>
                    <Input
                      className={inputClass}
                      defaultValue={editingEvent?.title}
                      {...register("title", { required: "Title is required" })}
                    />
                    {errors.title && <span className="text-red-500 text-xs">{errors.title.message}</span>}
                  </div>

                  {/* Banner */}
                  <div className="flex flex-col space-y-2">
                    <Label className="text-slate-300 text-sm font-medium">Banner Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      className={inputClass}
                      {...register("banner")}
                    />
                  </div>

                  {/* Category */}
                  <div className="flex flex-col space-y-2 relative">
                    <Label className="text-slate-300 text-sm font-medium">Category</Label>
                    <div className="relative">
                      <select
                        defaultValue={editingEvent?.category}
                        {...register("category", { required: "Category is required" })}
                        className={selectClass}
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat} className="bg-slate-950">
                            {cat}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        ↓
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex flex-col space-y-2">
                    <Label className="text-slate-300 text-sm font-medium">Location</Label>
                    <div className="relative">
                      <select
                        defaultValue={editingEvent?.location}
                        {...register("location", { required: "Location is required" })}
                        className={selectClass}
                      >
                        {LOCATIONS.map((loc) => (
                          <option key={loc} value={loc} className="bg-slate-950">
                            {loc}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                        ↓
                      </div>
                    </div>
                  </div>

                  {/* Event Date */}
                  <div className="flex flex-col space-y-2">
                    <Label className="text-slate-300 text-sm font-medium">Event Date</Label>
                    <Input
                      type="date"
                      className={inputClass}
                      defaultValue={editingEvent?.date}
                      {...register("date", { required: "Date is required" })}
                    />
                  </div>

                  {/* Ticket Price & Capacity (Sub-grid inside right column for perfect alignment) */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-2">
                      <Label className="text-slate-300 text-sm font-medium">Ticket Price</Label>
                      <Input
                        type="number"
                        className={inputClass}
                        defaultValue={editingEvent?.price}
                        {...register("price", { required: "Ticket price is required" })}
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Label className="text-slate-300 text-sm font-medium">Capacity</Label>
                      <Input
                        type="number"
                        className={inputClass}
                        defaultValue={editingEvent?.capacity}
                        {...register("capacity", { required: "Capacity is required" })}
                      />
                    </div>
                  </div>

                </div>

                {/* Description (Full Width - Outside Grid) */}
                <div className="flex flex-col space-y-2 w-full">
                  <Label className="text-slate-300 text-sm font-medium">Description</Label>
                  <TextArea
                    className="w-full bg-slate-900/50 border border-white/10 text-white rounded-xl focus-within:!border-pink-500/80 min-h-[100px]"
                    defaultValue={editingEvent?.description}
                    {...register("description", { required: "Description is required" })}
                  />
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:opacity-90 text-white font-semibold h-12 rounded-xl transition-all duration-300 shadow-lg shadow-pink-500/20"
                  >
                    Save Changes
                  </Button>
                </div>

              </Form>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditEventModal;