export const defaultStoreBrandFields = ["id", "name", "is_active"];

export const retrieveBrandConfig = {
  defaults: defaultStoreBrandFields,
  isList: false,
};

export const listBrandConfig = {
  ...retrieveBrandConfig,
  defaultLimit: 50,
  isList: true,
};
