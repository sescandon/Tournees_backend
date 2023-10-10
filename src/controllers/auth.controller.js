import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import pool from "../db.js";

export const Register = async (req, res) => {
  const { email, password, username, nationality } = req.body;

  try {
    // Check if email already exists in the database
    const result = await pool.promise().query(`SELECT * FROM users WHERE email = '${email}'`);
    
    if (typeof result !== "undefined") {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into database
    const newUser = {
      email: email,
      password: hashedPassword,
      username: username,
      nationality: nationality,
    };

    await pool.promise().query("INSERT INTO users SET?", newUser);

    const token = await createAccessToken({ email: email });

    res.cookie("token", token);

    res.status(200).json({ message: "User created successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
