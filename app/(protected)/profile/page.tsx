"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { ProfileSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from "next/image";

const ProfilePage = () => {
  const router = useRouter();
  const { session, status, update } = useAuth(true);
  const [isPending, startTransition] = useTransition();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: session?.user?.name || "",
      email: session?.user?.email || "",
      image: session?.user?.image || null,
      isTwoFactorEnabled: session?.user?.isTwoFactorEnabled || false,
    },
  });

  // Limpiar la URL del archivo previo cuando se desmonta el componente
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleImageChange = (file: File | null) => {
    //Limpiar la URL del archivo previo
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (file) {
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      form.setValue("image", file);
    } else {
      setPreviewUrl(null);
      form.setValue("image", null);
    }
  };

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "xjeogerm");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dtuzhikuw/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    return data.secure_url;
  };

  const deleteImageFromCloudinary = async (imageUrl: string) => {
    try {
      const urlParts = imageUrl.split("/");
      const publicId = urlParts[urlParts.length - 1].split(".")[0];

      await fetch("/api/cloudinary/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });
    } catch (error) {
      console.log("Error during the process:", error);
    }
  };

  const updateProfile = async (values: z.infer<typeof ProfileSchema>) => {
    try {
      startTransition(async () => {
        if (!session?.user?.id) {
          throw new Error("No user session found");
        }

        const currentImage = session?.user?.image;

        // Si hay una imagen actual y se sube un nuevo archivo, eliminar la imagen actual
        if (currentImage && values.image instanceof File) {
          await deleteImageFromCloudinary(currentImage);
        }

        // Manejar nueva imagen
        if (values.image && values.image instanceof File) {
          const imageUrl = await uploadImageToCloudinary(values.image);
          values.image = imageUrl;
        }

        const updatedValues = {...values, id: session?.user?.id};

        const response = await fetch("/api/profile", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedValues),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "An unexpected error occurred.");
        }

        update({
          ...session,
          user: {
            ...session.user,
            name: values.name,
            email: values.email,
            image: values.image,
            isTwoFactorEnabled: values.isTwoFactorEnabled,
          }
        })

        // Recargar la página para mostrar la nueva imagen y los nuevos datos
        router.refresh();
      });
    } catch (error) {
      console.log("Error during the process:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (status === "loading") return <div>Loading...</div>;

  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl">Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={form.handleSubmit(updateProfile)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="John Doe"
                      type="text"
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="email@example.com"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isTwoFactorEnabled"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Two Factor Code (2FA)</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="cursor-pointer">
                    <div className="relative h-24 w-24">
                      <div className="h-full w-full rounded-full overflow-hidden">
                        {previewUrl || field.value ? (
                          <>
                            <Image
                              src={
                                previewUrl ||
                                (typeof field.value === "string"
                                  ? field.value
                                  : "")
                              }
                              alt="Profile"
                              className="h-full w-full object-cover rounded-full"
                              layout="fill"
                            />
                            <button
                              type="button"
                              className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white"
                              onClick={(e) => {
                                e.preventDefault();
                                handleImageChange(null);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </>
                        ) : (
                          <div className="h-full w-full bg-gray-100 flex items-center justify-center rounded-full">
                            <Camera className="h-8 w-8 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageChange(file);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Saving..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProfilePage;
