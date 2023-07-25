import { prisma } from "../prisma/prisma.js";
import asyncHandler from "express-async-handler";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const registerUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Server dont get registration information");
  }
  const isHaveEmail = await prisma.users.findFirst({
    where: {
      email: email,
    },
  });
  if (isHaveEmail) {
    res.status(400);
    throw new Error("user already exists");
  }
  if (!role) {
    try {
      const passwordHash = await argon2.hash(password, 5);
      console.log(passwordHash);
      const accessToken = jwt.sign(
        { email, passwordHash },
        process.env.JWT_ACCESS_KEY,
        {
          expiresIn: "10h",
        }
      );
      const registerUserWithoutRole = await prisma.users.create({
        data: {
          email: email,
          password: passwordHash,
          accessToken: accessToken,
          role: "User",
        },
      });
      res.status(201);
      res.json(registerUserWithoutRole);
      
    } catch (error) {
      res.status(400);
      throw new Error(`Error in register user with out Role: ${error}`);
    }
  } else {
    try {
      const passwordHash = await argon2.hash(password, 5);
      const accessToken = jwt.sign(
        { email, passwordHash },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "10h" }
      );
      const registerWithRole = await prisma.users.create({
        data: {
          email: email,
          password: passwordHash,
          accessToken: accessToken,
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

export const loginUserWithToken = asyncHandler(async (req, res) => {
  let token = "";

  if (!req.body.token) {
    const authHeader = req.headers["authorization"];
    token = authHeader && authHeader.split(" ")[1];
  } else {
    token = req.body.token;
  }
  
  try {
    const data = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    const { email, passwordHash } = data;
    const verify = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (verify.email === email && passwordHash === verify.password) {
      res.status(200);
      res.json({ isValidToken: true, isExpired: false });
    } else {
      res.status(403);
      res.json({ isValidToken: false, isExpired: false });
    }
  } catch (error) {
    error.name === "TokenExpiredError"
      ? res.status(402).json({ isValidToken: false, isExpired: true })
      : "";
    res.status(400);
    throw new Error(`Error in authorization`);
  }
});

export const loginUserWithEmail = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    res.status(400);
    throw new Error("Missed email or password");
  }

  try {
    const validateUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    const revalidatePassword = await argon2.verify(
      validateUser.password,
      password
    );

    if (!revalidatePassword) {
      res.status(403);
      throw new Error("Incorrect email or password");
    }

    res.status(200);
    res.json(validateUser);
  } catch (error) {
    res.status(403);
    throw new Error("Fail to login");
  }
});
