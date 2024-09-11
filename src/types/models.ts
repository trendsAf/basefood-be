import { Optional } from "sequelize";

export interface roleModelAttributes {
	id: string;
	roleName: string;
}
export type roleCreationAttributes = Optional<roleModelAttributes, "id">;

export interface UserModelAttributes {
	id?: string;
	fullName: string;
	userName: string;
	phoneNumber: string;
	companyName: string;
	companyAddress: string;
	companyType: string;
	companyCategory: string;
	email: string;
	role: string;
	password: string;
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
