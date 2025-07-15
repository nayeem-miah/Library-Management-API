import express, { Application, Request, Response } from 'express';
import dotenv from "dotenv";
import bookRouter from './app/controller/books.controller';
import { borrowRouter } from './app/controller/borrow.controller';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
export const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());
dotenv.config()

// application router
app.use("/api", bookRouter)
app.use("/api", borrowRouter);


app.get("/", async (req: Request, res: Response) => {
    res.send("Hello server");
});

app.use(notFound);
app.use(globalErrorHandler);