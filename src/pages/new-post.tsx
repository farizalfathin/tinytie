import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpenText,
  CircleX,
  CornerRightUp,
  SquareArrowOutUpRight,
  UploadCloud,
} from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/authentication";
import { cn } from "@/lib/utils";
import { v4 as uuid } from "uuid";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

const addNewPostFormSchema = z.object({
  image: z.any().refine((file) => file instanceof File, {
    message: "Data harus berupa file",
  }),
  caption: z.string().min(8, "caption minimal harus 8 karakter"),
  tag: z.array(z.string().min(1, "Tag minimal harus 1 karakter")).default([]),
});

type AddNewPostFormSchema = z.infer<typeof addNewPostFormSchema>;

export default function NewPost() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [previewImage, setPreviewImage] = useState<string>("");
  const form = useForm<AddNewPostFormSchema>({
    resolver: zodResolver(addNewPostFormSchema),
    defaultValues: {
      caption: "",
      tag: [],
    },
  });
  const tagRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const handleAddTag = () => {
    if (tagRef.current) {
      if (
        tagRef.current.value.length > 0 &&
        !form.getValues("tag").includes(tagRef.current.value)
      ) {
        form.setValue("tag", [...form.getValues("tag"), tagRef.current.value]);
        tagRef.current.value = ""; // Kosongkan input
      }
    }
  };

  const addNewPost = async (data: AddNewPostFormSchema) => {
    if (!user) return;
    const { image, caption, tag } = data;
    setIsDisabled(true);

    try {
      if (!image || !(image instanceof File))
        throw new Error("error image from state");

      const fileExt = image.name.split(".").pop(); // Ambil ekstensi file
      const fileName = `${uuid()}.${fileExt}`; // Gunakan UUID untuk nama file
      const filePath = `posts/${fileName}`; // Path dalam bucket

      const { error: uploadError } = await supabase.storage
        .from("publicImages") // Ganti dengan nama bucket Anda
        .upload(filePath, image, { cacheControl: "3600", upsert: false });

      if (uploadError)
        throw new Error("Gagal mengunggah gambar: " + uploadError);

      const {
        data: { publicUrl },
      } = supabase.storage.from("publicImages").getPublicUrl(filePath);

      if (!publicUrl) throw new Error("Gagal mendapatkan URL gambar");

      const { data: insertData, error: insertError } = await supabase
        .from("posts")
        .insert([
          {
            image: publicUrl, // URL gambar
            caption: caption,
            user_id: user.id,
            tag: tag,
          },
        ])
        .select("id");

      if (insertError) throw new Error("Gagal menyimpan post: " + insertError);

      form.reset();
      toast({
        title: "Post berhasil ditambahkan",
        description: "Anda akan diarahkan ke halaman utama",
        duration: 7000,
        action: (
          <ToastAction
            altText="Go to new post"
            onClick={() => navigate("/post/" + insertData[0]?.id)}>
            Lihat Post Baru
          </ToastAction>
        ),
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error(error);
      setIsDisabled(false);
    }
  };

  return (
    <div className="flex justify-center shrink-0 ease-linear">
      <div className="w-full max-w-[468px] min-h-screen border border-secondary-200">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(addNewPost)}>
            <div className="flex items-center justify-center py-3 border-b border-secondary-200">
              <h1 className="text-lg font-semibold italic">New Post</h1>
            </div>
            <div className="p-4">
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <input
                          id="image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              field.onChange(file); // Set file value in the form
                              setPreviewImage(URL.createObjectURL(file)); // Update preview avatar
                            }
                          }}
                        />
                        <label
                          htmlFor="image"
                          className="relative w-28 h-28 group">
                          {previewImage ? (
                            <>
                              <img
                                src={previewImage}
                                alt=""
                                className="w-full aspect-square rounded-md object-cover object-center"
                              />
                              <div className="absolute top-0 w-full aspect-square bg-black/40 flex-col justify-center items-center rounded-md hidden group-hover:flex">
                                <UploadCloud className="size-8 text-white" />
                                <span className="text-sm text-white">
                                  Upload Image
                                </span>
                                <span className="text-[8px] text-white mb-1 italic">
                                  Image's cropped to 1:1
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="w-full aspect-square bg-secondary-200 flex flex-col justify-center items-center rounded-md">
                              <UploadCloud className="size-8 text-secondary-500" />
                              <span className="text-sm text-secondary-500">
                                Upload Image
                              </span>
                              <span className="text-[8px] text-secondary-500 mb-1 italic">
                                Image's cropped to 1:1
                              </span>
                            </div>
                          )}
                        </label>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="caption"
                  render={({ field }) => (
                    <FormItem className="w-full mt-2">
                      <FormControl>
                        <textarea
                          className="w-full resize-none outline-none border-b border-b-secondary-200"
                          rows={4}
                          placeholder="Tulis caption menarik"
                          {...field}></textarea>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col">
                <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem className="w-full mt-2">
                      <FormLabel className="font-medium text-lg">
                        Hashtag
                      </FormLabel>
                      {Array.isArray(field.value) && field.value.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((tag, index) => (
                            <div
                              key={index}
                              className="flex items-center text-sm ps-2 pe-1 py-1 gap-2 rounded-full bg-primary-100">
                              <span>{tag}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  form.setValue(
                                    "tag",
                                    field.value.filter((t) => t !== tag)
                                  )
                                }>
                                <CircleX className="size-4 text-primary-500" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      <FormControl>
                        <div className="flex gap-4 pe-4">
                          <input
                            ref={tagRef}
                            type="text"
                            className="w-full outline-none border-b border-b-secondary-200 ps-1 pb-1"
                            placeholder="Tambahkan tag (tekan Enter)"
                            onChange={(
                              e: React.FormEvent<HTMLInputElement>
                            ) => {
                              e.currentTarget.value =
                                e.currentTarget.value.replace(/\s+/g, "-");
                            }}
                            onKeyDown={(
                              e: React.KeyboardEvent<HTMLInputElement>
                            ) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddTag();
                              }
                            }}
                          />
                          <button type="button" onClick={handleAddTag}>
                            <CornerRightUp className="size-5" />
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-between items-bottom mt-4 pe-4">
                  <div className="flex items-center gap-2">
                    <BookOpenText className="size-5" />
                    Ikuti Peraturan
                  </div>
                  <div className="flex items-center gap-2">
                    <Link to="/terms-of-service">
                      <SquareArrowOutUpRight className="size-5" />
                    </Link>
                    <input
                      type="checkbox"
                      className="size-4"
                      onClick={() => setIsDisabled(!isDisabled)}
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                disabled={isDisabled}
                className={cn(
                  "bg-gradient-to-br from-primary-500 to-primary-400 text-white px-3 py-1 rounded-md mt-4 hover:from-primary-400 hover:to-primary-500",
                  isDisabled && "opacity-70 cursor-not-allowed"
                )}>
                Unggah
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
