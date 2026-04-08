import { 
  Button, 
  Drawer, 
  Heading, 
  Input, 
  Label, 
  Select, 
  toast 
} from "@medusajs/ui";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useCreateBrandImages } from "../../../../../hooks/api/brands";
import { sdk } from "../../../../../lib/sdk";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = zod.object({
  type: zod.enum(["thumbnail", "image"]),
});

type BrandImageAddDrawerProps = {
  brandId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const BrandImageAddDrawer = ({
  brandId,
  open,
  onOpenChange,
}: BrandImageAddDrawerProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const { mutateAsync: createBrandImages, isPending: isCreating } = 
    useCreateBrandImages(brandId);

  const form = useForm<zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "image",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = form.handleSubmit(async (data) => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setIsUploading(true);
    try {
      const { files } = await sdk.admin.upload.create({ files: [file] });
      const uploadedFile = files[0];

      await createBrandImages({
        images: [
          {
            type: data.type,
            url: uploadedFile.url,
            file_id: uploadedFile.id,
          },
        ],
      });

      toast.success("Image added successfully");
      onOpenChange(false);
      setFile(null);
      form.reset();
    } catch (error) {
      toast.error("Failed to add image");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  });

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <Drawer.Content>
        <Drawer.Header>
          <Heading>Add Brand Image</Heading>
        </Drawer.Header>
        <Drawer.Body className="gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label size="small" weight="plus">
              File
            </Label>
            <Input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          <Controller
            control={form.control}
            name="type"
            render={({ field }) => (
              <div className="flex flex-col gap-y-2">
                <Label size="small" weight="plus">
                  Type
                </Label>
                <Select 
                  value={field.value} 
                  onValueChange={field.onChange}
                >
                  <Select.Trigger>
                    <Select.Value placeholder="Select type" />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="image">Gallery Image</Select.Item>
                    <Select.Item value="thumbnail">Thumbnail</Select.Item>
                  </Select.Content>
                </Select>
              </div>
            )}
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Drawer.Close asChild>
            <Button variant="secondary">Cancel</Button>
          </Drawer.Close>
          <Button 
            onClick={handleSubmit} 
            isLoading={isUploading || isCreating}
            disabled={!file}
          >
            Add Image
          </Button>
        </Drawer.Footer>
      </Drawer.Content>
    </Drawer>
  );
};
