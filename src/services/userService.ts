import { User } from "../database/models/User";
import { hashPassword } from "../utils/hashPassword";
import { UserModelAttributes } from "../types/models";
import { comparePasswords } from "../utils/hashPassword";

export const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error: any) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

export const getUserById = async (id: number) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    return user;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createUser = async (
  firstName: string,
  lastName: string,
  email: string,
  companyName: string,
  companyAddress: string,
  companyCategory: string,
  position: string,
  password: string
): Promise<User | null> => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return null;
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    firstName,
    lastName,
    email,
    companyName,
    companyAddress,
    companyCategory,
    position,
    password: hashedPassword,
  });

  return user;
};

export const updateUser = async (
  id: number,
  updateData: Partial<Omit<UserModelAttributes, "id" | "password">>
): Promise<User | null> => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    await user.update(updateData);
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    const deletedCount = await User.destroy({ where: { id } });
    return deletedCount > 0;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const changePassword = async (
  userId: number,
  oldPassword: string,
  newPassword: string
): Promise<boolean> => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return false;
    }
    const isOldPasswordValid = await comparePasswords(
      oldPassword,
      user.password
    );
    if (!isOldPasswordValid) {
      return false;
    }
    const hashedNewPassword = await hashPassword(newPassword);
    await user.update({ password: hashedNewPassword });
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
