import express, { Express, Request, Response } from "express";
import "dotenv/config";
import router from "./routes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import docs from "./documantation";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.use(morgan("dev"));
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(docs));
app.get("/api/v1", (_req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to basefood API",
  });
});
app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
