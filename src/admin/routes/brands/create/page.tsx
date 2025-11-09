import { RouteFocusModal } from "../../../components/modals/route-focus-modal";
import { BrandCreateForm } from "../components/brand-create-form";

const CreateBrand = () => {
  return (
    <RouteFocusModal>
      <BrandCreateForm />
    </RouteFocusModal>
  );
};

export default CreateBrand;
