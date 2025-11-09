import { TFunction } from "i18next";

export function getIsActiveProps(
  isActive: boolean,
  t: TFunction,
): { color: "green" | "red"; label: string } {
  switch (isActive) {
    case true:
      return {
        label: t("categories.fields.status.active"),
        color: "green",
      };
    case false:
      return {
        label: t("categories.fields.status.inactive"),
        color: "red",
      };
  }
}
