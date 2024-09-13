import { Optional } from "sequelize";

export interface roleModelAttributes {
  id: string;
  roleName: string;
}
export type roleCreationAttributes = Optional<roleModelAttributes, "id">;

export interface UserModelAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  companyAddress: string;
  companyCategory: string;
  position: string;
  password: string;
  role?: string;
}

export type ProductCreationAttributes = Omit<ProductAttributes, "id">;

export interface UserModelInclude extends UserModelAttributes {
  Roles: any;
}

export interface TokenModelAttributes {
  id: string;
  token: string;
}

export type TokenCreationAttributes = Optional<TokenModelAttributes, "id">;

export interface ProductAttributes {
  id: string;
  name: string;
  title: number;
  images: string[];
  description: string;
  artistId: string;
}
