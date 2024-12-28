import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(req: Request) {
    try {
        const { publicId } = await req.json();

        if (!publicId) {
            return new NextResponse("Missing publicId", { status: 400 });
        }

        const result = await cloudinary.uploader.destroy(publicId);

        return NextResponse.json(result);
    } catch (error) {
        console.log("Error deleting the image:", error);
        return new NextResponse("Error deleting the image", { status: 500 });
    }
}