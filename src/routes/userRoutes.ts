import express from "express";
import {
  registerUser,
  userLogin,
  getAllUsersController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
} from "../controllers/userController";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", userLogin);
router.get("/", getAllUsersController);
router.get("/:id", getUserByIdController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
