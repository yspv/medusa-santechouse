import { Text } from "@medusajs/ui";
import { useTranslation } from "react-i18next";
import { BrandImageDTO } from "../../../../../../types/brand/common";
import { UploadedFile } from "../../../../../types";
import { BrandImageItem } from "./brand-image-item";

type BrandImageGalleryProps = {
  existingImages: BrandImageDTO[];
  uploadedFiles: UploadedFile[];
  imagesToDelete: Set<string>;
  currentThumbnailId: string | null;
  selectedImageIds: Set<string>;
  onToggleSelect: (id: string, isUploaded?: boolean) => void;
};

export const BrandImageGallery = ({
  existingImages,
  uploadedFiles,
  imagesToDelete,
  currentThumbnailId,
  selectedImageIds,
  onToggleSelect,
}: BrandImageGalleryProps) => {
  const { t } = useTranslation();
  const visibleExistingImages = existingImages.filter(
    (image) => image.id && !imagesToDelete.has(image.id),
  );

  const hasNoImages =
    visibleExistingImages.length === 0 && uploadedFiles.length === 0;

  return (
    <div className="bg-ui-bg-subtle size-full overflow-auto">
      <div className="grid h-fit auto-rows-auto grid-cols-4 gap-6 p-6">
        {visibleExistingImages.map((image) => {
          const imageId = image.id;
          const isThumbnail = currentThumbnailId === imageId;

          return (
            <BrandImageItem
              key={imageId}
              id={imageId}
              url={image.url}
              alt={t("brands.media.imageAlt", { type: image.type })}
              isThumbnail={isThumbnail}
              isSelected={selectedImageIds.has(imageId)}
              onToggleSelect={() => onToggleSelect(imageId)}
            />
          );
        })}

        {uploadedFiles.map((file) => {
          const uploadedId = `uploaded:${file.id}`;
          const isThumbnail = currentThumbnailId === uploadedId;

          return (
            <BrandImageItem
              key={file.id}
              id={file.id}
              url={file.url}
              alt={t("brands.media.uploaded")}
              isThumbnail={isThumbnail}
              isSelected={selectedImageIds.has(uploadedId)}
              onToggleSelect={() => onToggleSelect(file.id, true)}
            />
          );
        })}

        {hasNoImages && (
          <div className="col-span-4 flex items-center justify-center p-8">
            <Text className="text-ui-fg-subtle text-center">
              {t("brands.media.noImagesHint")}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};
