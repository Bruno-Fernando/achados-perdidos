import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { PostPayload } from "@/lib/validators/newPost";
import { X } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  isLoading: boolean;
}

export default function UploadPostImg({ isLoading }: Props) {
  const form = useFormContext<PostPayload>();

  const [img, setImg] = useState("");

  const resetImg = () => {
    form.setValue("postImg", "");
    setImg("");
  };

  const convertToBase64 = (file: Blob) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        setImg(reader.result.toString());
      }
    };

    reader.readAsDataURL(file);
  };

  const selectedImg = form.watch("postImg");

  if (selectedImg.length > 0) {
    convertToBase64(selectedImg[0]);
  }

  return (
    <div className="">
      <Label
        htmlFor="post-img"
        className={form.formState.errors.postImg && "text-destructive"}
      >
        <Button asChild className="hover:cursor-pointer">
          <span className={isLoading ? "pointer-events-none" : ""}>
            Selecione uma imagem
          </span>
        </Button>
      </Label>

      <Input
        id="post-img"
        type="file"
        accept="image/*"
        className="hidden"
        {...form.register("postImg")}
      />

      {img && (
        <div className="relative mt-4 h-60 w-60">
          <img
            src={img}
            alt="Imagem do post"
            className="h-60 w-60 object-cover"
          />
          <Button
            size="icon"
            className="absolute -right-2 -top-2 rounded-full"
            onClick={resetImg}
            disabled={isLoading}
          >
            <X />
          </Button>
        </div>
      )}

      <span className="text-destructive">
        {form.formState.errors.postImg?.message?.toString()}
      </span>
    </div>
  );
}
