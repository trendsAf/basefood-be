import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByEmail,
  getUserById,
  updateUser,
} from "../services/userService";
import { comparePasswords } from "../utils/hashPassword";
import { generateToken } from "../utils/jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      companyName,
      companyAddress,
      companyCategory,
      position,
      password,
    } = req.body;

    const newUser = await createUser(
      firstName,
      lastName,
      email,
      companyName,
      companyAddress,
      companyCategory,
      position,
      password
    );

    if (!newUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error: any) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "Invalid credentials!",
      });
    }

    const match = await comparePasswords(password, user.password);
    if (!match) {
      return res.status(401).json({
        status: 401,
        message: "Invalid credentials!",
      });
    }

    const accessToken = await generateToken(user);

    return res.status(200).json({
      status: 200,
      message: "You're logged in",
      token: accessToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        companyName: user.companyName,
        companyAddress: user.companyAddress,
        companyCategory: user.companyCategory,
        position: user.position,
        role: user.role,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: "Error during login",
      error: error.message,
    });
  }
};

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const updatedUser = await updateUser(Number(req.params.id), req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteUser(Number(req.params.id));
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

export const getUserByEmailController = async (req: Request, res: Response) => {
  try {
    const user = await getUserByEmail(req.params.email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};
