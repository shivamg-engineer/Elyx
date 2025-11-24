export type Role = "user" | "vendor";

export interface JwtPayload {
  id: number;
  email: string;
  role: Role;
  iat?: number;
  exp?: number;
}
