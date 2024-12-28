import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const { id, name, email, image, isTwoFactorEnabled } = await req.json();
    console.log({ id, name, email, image, isTwoFactorEnabled });

    if (!id) {
      return new NextResponse(
        JSON.stringify({ status: "error", message: "User ID is required!" }),
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        image,
        isTwoFactorEnabled,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ status: "error", message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}
