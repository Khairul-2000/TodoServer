import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = (password) => {
  return bcrypt.hash(password, 5);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const createJWT = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
  );

  return token;
};

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    console.log(token);
    return res.status(401).json({ message: "not valid token" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    console.log(user);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
