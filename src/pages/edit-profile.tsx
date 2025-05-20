import RenderList from "@/components/others/RenderList";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/authentication";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Focus } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { z } from "zod";

const editProfileFormSchema = z.object({
  username: z
    .string()
    .min(8, "Username harus minimal 8 karakter")
    .regex(
      /^[a-z0-9_]+$/,
      "Username hanya boleh huruf kecil, angka, atau underscore dan tanpa spasi"
    )
    .max(16, "Username harus maksimal 16 karakter"),
  full_name: z
    .string()
    .min(5, "Nama lengkap harus minimal 5 karakter")
    .regex(/^[A-Z][a-zA-Z\s]*$/, "Nama harus diawali huruf besar")
    .max(20, "Username harus maksimal 20 karakter"),
  bio: z.string().optional(),
  avatar_url: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Avatar harus berupa file",
    })
    .optional(),
});

type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>;

export default function EditProfile() {
  const { user, verifyUserId } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [previewAvatar, setPreviewAvatar] = useState<string>(""); // State untuk gambar sementara
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const form = useForm<EditProfileFormSchema>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      username: "",
      full_name: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        username: user.username,
        full_name: user.full_name,
        bio: user.bio || "",
      });
      setPreviewAvatar(user.avatar_url || "");
    }
  }, [user]);

  const handleUpdateProfile = async (data: EditProfileFormSchema) => {
    if (!user) return;
    setIsDisabled(true);
    const { full_name, username, bio, avatar_url } = data;
    let newAvatarUrl: string = previewAvatar;

    try {
      if (avatar_url && avatar_url instanceof File) {
        const oldAvatarPath = previewAvatar.split("/").pop(); // Ambil nama file lama
        await supabase.storage
          .from("publicImages")
          .remove([`avatars/${oldAvatarPath}`]);

        const fileExt = avatar_url.name.split(".").pop();
        const fileName = uuid() + "." + fileExt;
        const filePath = "avatars/" + fileName;

        const { error: uploadError } = await supabase.storage
          .from("publicImages")
          .upload(filePath, avatar_url, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError)
          throw new Error("error upload new image: " + uploadError);

        const {
          data: { publicUrl },
        } = supabase.storage.from("publicImages").getPublicUrl(filePath);

        newAvatarUrl = publicUrl;
      }

      const { error: updateError } = await supabase
        .from("users")
        .update({ full_name, username, bio, avatar_url: newAvatarUrl })
        .eq("id", user.id);

      if (updateError)
        throw new Error("error update users profile: " + updateError);

      toast({
        title: "Profile berhasil diperbarui",
        description: "Anda akan diarahkan ke halaman profile",
        duration: 7000,
      });

      setTimeout(() => {
        navigate("/account/me");
      }, 2000);
      await verifyUserId(user.id);
    } catch (error) {
      console.log(error);
      toast({
        title: "Profile gagal diperbarui",
        description: "Anda gagal memperbarui profile. Silahkan coba lagi!",
        duration: 5000,
      });
      setIsDisabled(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit Profile | TinyTie</title>
        <meta
          name="description"
          content="Edit profil akun TinyTie Anda dengan nama, username, bio, dan avatar baru."
        />
        <meta property="og:title" content="Edit Profile | TinyTie" />
        <meta
          property="og:description"
          content="Edit profil akun TinyTie Anda dengan nama, username, bio, dan avatar baru."
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="flex-1 flex justify-center shrink-0 ease-linear">
        <section className="w-full h-full border border-b-0 border-border">
          {!user ? (
            <>
              <div className="flex items-center justify-center py-3 border-b border-border">
                <Skeleton className="w-36 h-6" />
              </div>
              <div className="py-6">
                <Skeleton className="h-24 w-24 rounded-full mb-4 mx-auto" />
                <div className="flex flex-col items-center gap-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="w-full max-w-sm flex flex-col gap-2 mx-auto">
                      <Skeleton className="w-12 h-4 rounded" />
                      <Skeleton className="w-full h-8 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleUpdateProfile)}>
                <div className="py-3 border-b border-border">
                  <h1 className="text-lg font-semibold text-center">
                    Edit Profile
                  </h1>
                </div>
                <div className="w-full max-w-sm mx-auto py-6 px-4">
                  <div className="relative w-24 h-24 mx-auto mb-1">
                    <img
                      className="w-full aspect-square rounded-full"
                      src={previewAvatar}
                      alt=""
                    />
                    <FormField
                      control={form.control}
                      name="avatar_url"
                      render={({ field }) => (
                        <FormItem className="absolute bottom-0 right-0">
                          <FormControl>
                            <div className="flex items-center">
                              <Input
                                id="avatar"
                                type="file"
                                accept="image/jpeg"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    field.onChange(file); // Set file value in the form
                                    setPreviewAvatar(URL.createObjectURL(file)); // Update preview avatar
                                  }
                                }}
                              />
                              <Label
                                htmlFor="avatar"
                                className="p-1 bg-primary border-2 border-white rounded-full cursor-pointer dark:border-zinc-950">
                                <Focus className="size-5 text-white" />
                              </Label>
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            onChange={(e) => {
                              field.onChange(
                                e.currentTarget.value.replace(/\s+/g, "_")
                              );
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <RenderList
                    of={[
                      { name: "full_name", label: "Fullname" },
                      { name: "bio", label: "Bio" },
                    ]}
                    render={(item: { name: any; label: string }, index) => (
                      <FormField
                        key={index}
                        control={form.control}
                        name={item.name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{item.label}</FormLabel>
                            <FormControl>
                              <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  />
                  <Button
                    type="submit"
                    disabled={isDisabled}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 px-2 py-1 rounded-md mt-4">
                    Simpan
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </section>
      </div>
    </>
  );
}
