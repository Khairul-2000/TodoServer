import express from "express";
import morgan from "morgan";
import cors from "cors";
import { createUser, singin } from "./handlers/user";
import router from "./router";
import { protect } from "./modules/auth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.use("/api", protect, router);

app.post("/user", createUser);
app.post("/user/singin", singin);

export default app;
