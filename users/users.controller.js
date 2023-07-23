import { prisma } from "../prisma/prisma.js";
import asyncHandler from "express-async-handler";

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Server dont get registration information");
  }

  if (!role) {
    try {
      const registerUserWithoutRole = await prisma.users.create({
        data: {
          email: email,
          password: password,
          role: "User",
        },
      });

      res.status(201);
      res.json(registerUserWithoutRole);
    } catch (error) {
      res.status(400);
      throw new Error("Error in register usert with out Role");
    }
  } else {
    try {
      const registerWithRole = await prisma.users.create({
        data: {
          email: email,
          password: password,
          role: role,
        },
      });

      res.status(201);
      res.json(registerWithRole);
    } catch (error) {
      res.status(400);
      throw new Error("Error in create user with role");
    }
  }
});
