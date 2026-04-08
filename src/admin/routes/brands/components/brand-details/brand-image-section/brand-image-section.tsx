import { Plus, Star, Trash } from "@medusajs/icons";
import { 
  Button, 
  Container, 
  Heading, 
  IconButton, 
  StatusBadge, 
  clx,
  toast
} from "@medusajs/ui";
import { useState } from "react";
import { 
  useBrandImages, 
  useDeleteBrandImages, 
  useUpdateBrandImages 
} from "../../../../../hooks/api/brands";
import { BrandImageAddDrawer } from "./brand-image-add-drawer";
import { AdminBrand } from "../../../../../../types/http";

type BrandImageSectionProps = {
  brand: AdminBrand;
};

export const BrandImageSection = ({ brand }: BrandImageSectionProps) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { brand_images, isLoading } = useBrandImages(brand.id);
  const { mutateAsync: updateImages } = useUpdateBrandImages(brand.id);
  const { mutateAsync: deleteImages } = useDeleteBrandImages(brand.id);

  const handleSetThumbnail = async (id: string) => {
    try {
      // First, find current thumbnail if any and set it to image
      const currentThumbnail = brand_images?.find(img => img.type === "thumbnail");
      const updates = [];
      
      if (currentThumbnail) {
        updates.push({ id: currentThumbnail.id, type: "image" });
      }
      
      updates.push({ id, type: "thumbnail" });

      await updateImages({ updates });
      toast.success("Thumbnail updated");
    } catch (error) {
      toast.error("Failed to update thumbnail");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      await deleteImages({ ids: [id] });
      toast.success("Image deleted");
    } catch (error) {
      toast.error("Failed to delete image");
    }
  };

  if (isLoading) {
    return (
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading>Media</Heading>
        </div>
        <div className="p-6">Loading...</div>
      </Container>
    );
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading>Media</Heading>
        <Button 
          variant="secondary" 
          size="small" 
          onClick={() => setIsAddOpen(true)}
        >
          <Plus /> Add
        </Button>
      </div>
      
      <div className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {brand_images?.map((image) => (
          <div 
            key={image.id} 
            className="group relative aspect-square overflow-hidden rounded-lg border bg-ui-bg-subtle"
          >
            <img 
              src={image.url} 
              alt="Brand" 
              className="h-full w-full object-cover"
            />
            
            <div className="absolute inset-0 flex items-center justify-center gap-x-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <IconButton 
                size="small" 
                variant="transparent"
                onClick={() => handleSetThumbnail(image.id)}
                className={clx({
                  "text-yellow-400": image.type === "thumbnail"
                })}
              >
                <Star />
              </IconButton>
              <IconButton 
                size="small" 
                variant="transparent"
                onClick={() => handleDelete(image.id)}
              >
                <Trash />
              </IconButton>
            </div>

            {image.type === "thumbnail" && (
              <div className="absolute left-2 top-2 text-[10px]">
                <StatusBadge color="green">Thumbnail</StatusBadge>
              </div>
            )}
          </div>
        ))}
        
        {(!brand_images || brand_images.length === 0) && (
          <div className="col-span-full py-8 text-center text-ui-fg-muted">
            No images uploaded yet.
          </div>
        )}
      </div>

      <BrandImageAddDrawer 
        brandId={brand.id}
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
      />
    </Container>
  );
};
