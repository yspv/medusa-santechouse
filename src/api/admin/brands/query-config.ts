export const defaultAdminBrandsFields = [
  "id",
  "name",
  "is_active",
  "created_at",
  "updated_at",
  "deleted_at",
  "metadata",
];

export const retrieveBrandConfig = {
  defaults: defaultAdminBrandsFields,
  isList: false,
};
export const listBrandConfig = {
  ...retrieveBrandConfig,
  defaultLimit: 50,
  isList: true,
};
