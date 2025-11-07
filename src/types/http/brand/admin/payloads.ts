export interface AdminCreateBrand {
  name: string;
  is_active?: boolean;
  metadata?: Record<string, unknown>;
}

export interface AdminUpdateBrand extends Partial<AdminCreateBrand> {}
