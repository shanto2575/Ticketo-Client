import { toast } from "@heroui/react";

export const uploadImageToImgBB = async (imageFile) => {
        const formData = new FormData();
        formData.append("image", imageFile);

        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        try {
            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${apiKey}`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const data = await response.json();

            if (data.success) {
                return data.data.url;
            }

            toast.errors("Image upload failed");
        } catch (error) {
            console.error(error);
            return null;
        }
    };