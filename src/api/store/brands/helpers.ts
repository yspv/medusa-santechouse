export function remapKeyForBrandProducts(field: string): string {
  const match = field.match(/^([+\-!]?)(.+)$/);
  if (!match) return field;
  const [, operator, path] = match;
  return `${operator}product.${path}`;
}
