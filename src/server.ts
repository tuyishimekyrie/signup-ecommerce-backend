import express, { Router } from "express";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { logger } from "./config/Logger";
dotenv.config();
export function configureApp(): express.Application {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  const apiRouter = Router();
  apiRouter.get("/", (req, res) => {
    res.status(200).send("Welcome to E-commerce API v1");
  });
  app.use("/api/v1", apiRouter);
  app.get("/", (req, res) => {
    res.status(200).send("welcome to E-commerce API");
  });
  app.all("*", (req, res) => {
    res.status(404).json({
      message: "Route not found",
    });
  });

  return app;
}

const app = configureApp();
const PORT = process.env.PORT || 8000;
const server = createServer(app);
server.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
