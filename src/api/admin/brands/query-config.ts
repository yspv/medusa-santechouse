export const defaultAdminBrandsFields = [
  "id",
  "name",
  "handle",
  "is_active",
  "created_at",
  "updated_at",
  "deleted_at",
  "metadata",
  "images.*",
];

export const defaultAdminBrandProductsFields = ["*product"];

export const retrieveBrandConfig = {
  defaults: defaultAdminBrandsFields,
  isList: false,
};

export const listBrandConfig = {
  ...retrieveBrandConfig,
  defaultLimit: 50,
  isList: true,
};

export const listBrandProductsConfig = {
  defaults: defaultAdminBrandProductsFields,
  defaultLimit: 50,
  isList: true,
};
