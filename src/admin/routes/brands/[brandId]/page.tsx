import { useBrand } from "../../../hooks/api/brands";
import { useParams } from "react-router-dom";
import { JsonViewSection } from "../../../components/common/json-view-section";
import { MetadataSection } from "../../../components/common/metadata-section";
import { BrandGeneralSection } from "../components/brand-details/brand-general-section";
import { BrandProductSection } from "../components/brand-details/brand-product-section";

const BrandDetails = () => {
  const { brandId } = useParams();
  const { brand, isLoading } = useBrand(brandId!, undefined, {
    enabled: !!brandId,
  });
  if (isLoading) return <>Loading...</>;
  if (!brand) {
    throw "brand not found";
  }
  return (
    <div className="flex flex-col gap-y-4">
      <BrandGeneralSection brand={brand} />
      <BrandProductSection brand={brand} />
      <JsonViewSection data={brand} />
      <MetadataSection data={brand} />
    </div>
  );
};
export default BrandDetails;
