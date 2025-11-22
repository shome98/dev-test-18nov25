import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import config from "./environment-variables";

const app = express();
const port = config.PORT || 3000;
const originFrontEnd = config.TRUSTED_ORIGIN_URL2;
app.use(
  cors({
    origin: originFrontEnd,
    credentials: true,
  })
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, please use /api/auth/ routes!");
});
app.get("/api/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  return res.json(session);
});

app.listen(port, () => {
  console.log(`Server running on port ${port} http://localhost:${port}`);
});

export default app;
