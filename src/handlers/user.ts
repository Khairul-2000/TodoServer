import db from "../db";
import { comparePassword, createJWT, hashPassword } from "../modules/auth";

export const createUser = async (req, res) => {
  try {
    const newUser = await db.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: await hashPassword(req.body.password),
      },
    });
    res.json({ message: "Sign up Successfull!" });
  } catch (error) {
    console.error(error);
    res.status(500).json("An error occurred while creating the user");
  }
};

export const singin = async (req, res) => {
  try {
    const user = await db.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(req.body.password + " " + user.password);

    const isValid = await comparePassword(req.body.password, user.password);
    console.log("isValid", isValid);

    if (!isValid) {
      res.status(401).json({ message: "Invalid password or username" });
      return;
    }

    const token = createJWT(user);

    res.json({ message: "Sign in Successfull!", token: token, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while signing in the user");
  }
};
