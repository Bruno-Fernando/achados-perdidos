"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Textarea } from "@/components/ui/Textarea";
import EditPostImg from "./EditPostImg";
import { Button } from "@/components/ui/Button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { PostPayload, PostValidator } from "@/lib/validators/newPost";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePost } from "@/services/usePost";
import { useToast } from "@/hooks/use-toast";
import { $Enums } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  post: {
    id: string;
    title: string;
    description: string;
    type: $Enums.PostType;
    imgKey: string | null;
    imgUrl: string | null;
  };
}

function EditPostForm({
  post: { id, title, description, type, imgKey, imgUrl },
}: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<PostPayload>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title,
      description,
      status: type,
      postImg: imgUrl ?? "",
    },
  });

  const { mutate: updatePost, isPending } = useUpdatePost({
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Seu post acaba de ser atualizado!",
      });
      router.push("/home");
    },
    onError: () => {
      toast({
        title: "Erro",
        variant: "destructive",
        description: "Ops, aconteceu um problema, tente novamente mais tarde",
      });
    },
  });

  const onSubmit = (values: PostPayload) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("status", values.status);

    if (values.postImg && values.postImg !== imgUrl) {
      formData.append("postImg", values.postImg[0]);
    }

    if (imgKey && values.postImg !== imgUrl) {
      formData.append("deleteImg", JSON.stringify(true));
    }

    updatePost({ postId: id, body: formData });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input
                  maxLength={50}
                  {...field}
                  disabled={isPending}
                  placeholder="O que você perdeu ou encontrou?"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte como você encontrou o objeto ou a última vez que o viu"
                  className="resize-none"
                  rows={4}
                  maxLength={150}
                  {...field}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                  disabled={isPending}
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="LOST" />
                    </FormControl>
                    <FormLabel className="font-normal">Perdido</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="FOUND" />
                    </FormControl>
                    <FormLabel className="font-normal">Encontrado</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <EditPostImg isLoading={isPending} postImg={imgUrl} />

        <Button type="submit" className="mx-auto flex" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Editar postagem
        </Button>
      </form>
    </Form>
  );
}

export default EditPostForm;
