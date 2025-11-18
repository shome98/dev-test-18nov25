import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 6789;
const orginFrontEnd = process.env.FRONT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: orginFrontEnd,
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  if (orginFrontEnd === undefined) {
    return res.json("origin not set");
  }
  res.json("please call /api");
});
app.get("/api", (req, res) => {
  res.cookie(
    "my-cookie",
    "542ae3a30b1c7b5011d4b15e4c1bd63ab002f436bc1f84173f4a19f63e8ff0954a145b195a20f2531019dcf5f89bed6dab7c77f432602bb93b64b0f909ec9f79",
    {
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      secure: process.env.NODE_ENV === "development" ? false : true,
      sameSite: "none",
      path: "/",
    }
  );
  res.send(`Hello, world! from ${req.headers["user-agent"]}`);
});

app.listen(port, () => {
  console.log(`Server running on port ${port} http://localhost:${port}`);
});

export default app;
