import { sign, verify } from "jsonwebtoken";
import { UserModelAttributes } from "../types/models";

const jwtSecret = process.env.JWT_SECRET;

export const generateToken = async (user: Partial<UserModelAttributes>) => {
  const accessToken = sign(
    {
      id: user.id,
      roleId: user.roleId,
      email: user.email,
    },
    `${jwtSecret}`,
    { expiresIn: "72h" }
  );
  return accessToken;
};

export const decodeToken = async (token: string) => {
  const decoded = await verify(token, `${jwtSecret}`);
  return decoded;
};
