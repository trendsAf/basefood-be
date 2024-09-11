import express, { Express, Request, Response } from "express";
import "dotenv/config";
import router from "./routes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import docs from "./documantation";
import { routes_home_page } from "./utils/html.utils";

const app: Express = express();

app.use("/api/v1", router);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(docs));
app.get("/api/v1", (_req: Request, res: Response) => {
	res.status(200).json({
		message: "Welcome to basefood API",
	});
});
app.get("/", (_req: Request, res: Response) => {
	res.send(routes_home_page);
});

export default app;
