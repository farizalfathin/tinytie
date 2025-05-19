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
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/authentication";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

const editPostFormSchema = z.object({
  caption: z.string().min(8, "caption minimal harus 8 karakter"),
  tag: z.array(z.string().min(1, "Tag minimal harus 1 karakter")).default([]),
});

type EditPostFormSchema = z.infer<typeof editPostFormSchema>;

export default function EditPost() {
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string>("");
  const form = useForm<EditPostFormSchema>({
    resolver: zodResolver(editPostFormSchema),
    defaultValues: {
      caption: "",
      tag: [],
    },
  });
  const tagRef = useRef<HTMLInputElement>(null);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const fetchDetailPost = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("user_id", user?.id)
        .eq("id", id)
        .single();

      if (error) throw new Error("error fetching detail post: " + error);

      form.reset({
        caption: data.caption,
        tag: data.tag || [],
      });
      setPreviewImage(data.image);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && id) {
      fetchDetailPost();
    }
  }, [user, id]);

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

  const editPost = async (data: EditPostFormSchema) => {
    if (!user || !id) return;
    const { caption, tag } = data;
    setIsDisabled(true);

    try {
      const { error: updateError } = await supabase
        .from("posts")
        .update({ caption, tag })
        .eq("id", id)
        .eq("user_id", user.id);

      if (updateError)
        throw new Error("error update post: " + updateError.message);

      toast({
        title: "anda berhasil memperbarui postingan",
        description: "Anda diarahkan ke halaman postingan anda",
        duration: 7000,
      });

      setTimeout(() => {
        navigate("/post/" + id);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast({
        title: "Anda gagal memperbarui postingan",
        description:
          "Anda gagal memperbarui postingan anda. Silahkan coba lagi!",
        duration: 5000,
      });
      setIsDisabled(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit Postingan Anda | TinyTie</title>
        <meta
          name="description"
          content="Edit caption dan tag dari postingan Anda di TinyTie dengan mudah dan cepat."
        />
        <meta property="og:title" content="Edit Postingan Anda | TinyTie" />
        <meta
          property="og:description"
          content="Perbarui caption dan tag dari postingan Anda agar tampil lebih menarik."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://tiny-tie.vercel.app/edit-post/${id}`}
        />
        <meta
          property="og:image"
          content={previewImage || "/default-preview.jpg"}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Edit Postingan Anda | TinyTie" />
        <meta
          name="twitter:description"
          content="Perbarui caption dan tag dari postingan Anda agar tampil lebih menarik."
        />
        <meta
          name="twitter:image"
          content={previewImage || "/default-preview.jpg"}
        />
      </Helmet>
      <div className="flex-1 flex justify-center shrink-0 ease-linear">
        <section className="w-full h-full border border-b-0 border-border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(editPost)}>
              <div className="flex items-center justify-center py-3 border-b border-border">
                <h1 className="text-lg font-semibold italic">Edit Post</h1>
              </div>
              <div className="p-4">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="w-28 h-28">
                      <img
                        src={previewImage}
                        alt="preview-image"
                        className="w-full aspect-square rounded-md object-cover object-center"
                      />
                    </div>
                    <span className="text-xs text-secondary-500 mb-1 italic">
                      Gambar tidak dapat diubah
                    </span>
                  </div>
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
                        {Array.isArray(field.value) &&
                          field.value.length > 0 && (
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
        </section>
      </div>
    </>
  );
}
