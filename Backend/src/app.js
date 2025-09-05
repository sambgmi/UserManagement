import express from "express";
import morgan from "morgan";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
