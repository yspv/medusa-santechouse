import { Container, Heading, StatusBadge } from "@medusajs/ui";
import { AdminBrand } from "../../../../../../types/http";
import { getIsActiveProps } from "../../../common/utils";
import { useTranslation } from "react-i18next";
import { ActionMenu } from "../../../../../components/common/action-menu";
import { PencilSquare } from "@medusajs/icons";

type BrandGeneralSectionProps = {
  brand: AdminBrand;
};

export const BrandGeneralSection = (props: BrandGeneralSectionProps) => {
  const { brand } = props;
  const { t } = useTranslation();
  const activeProps = getIsActiveProps(brand.is_active, t);
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading>{brand.name}</Heading>
        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <StatusBadge color={activeProps.color}>
              {activeProps.label}
            </StatusBadge>
          </div>
          <ActionMenu
            groups={[
              {
                actions: [
                  {
                    label: t("actions.edit"),
                    icon: <PencilSquare />,
                    to: "edit",
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </Container>
  );
};
