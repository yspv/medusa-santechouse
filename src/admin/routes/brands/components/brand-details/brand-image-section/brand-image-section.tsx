import { Container, Heading, Text } from "@medusajs/ui";
import { ThumbnailBadge } from "@medusajs/icons";
import { useTranslation } from "react-i18next";
import { useBrandImages } from "../../../../../hooks/api/brands";
import { BrandMediaModal } from "./brand-media-modal";
import { AdminBrand } from "../../../../../../types/http";

type BrandImageSectionProps = {
  brand: AdminBrand;
};

export const BrandImageSection = ({ brand }: BrandImageSectionProps) => {
  const { brand_images, isLoading } = useBrandImages(brand.id);
  const { t } = useTranslation();

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">{t("brands.media.header")}</Heading>
        <BrandMediaModal
          brandId={brand.id}
          existingImages={brand_images ?? []}
        />
      </div>
      <div className="px-6 py-4">
        <div className="grid grid-cols-[repeat(auto-fill,96px)] gap-4">
          {isLoading && (
            <div className="col-span-full">
              <Text size="small" className="text-ui-fg-subtle">{t("general.loading")}</Text>
            </div>
          )}
          {!isLoading && (!brand_images || brand_images.length === 0) && (
            <div className="col-span-full">
              <Text size="small" className="text-ui-fg-subtle">
                {t("brands.media.noImages")}
              </Text>
            </div>
          )}
          {brand_images?.map((image) => (
            <div
              key={image.id}
              className="relative aspect-square overflow-hidden rounded-lg border border-ui-border-base bg-ui-bg-subtle"
            >
              <img
                src={image.url}
                alt={t("brands.media.imageAlt", { type: image.type })}
                className="h-full w-full object-cover"
              />
              {image.type === "thumbnail" && (
                <div className="absolute top-2 left-2">
                  <ThumbnailBadge />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
