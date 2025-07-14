import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import bookRouter from './app/controller/books.controller';
import { borrowRouter } from './app/controller/borrow.controller';
export const app = express();
app.use(express.json());
dotenv.config()

// application router
app.use("/api", bookRouter)
app.use("/api", borrowRouter);

app.get("/", async (req: Request, res: Response) => {
    res.send("Hello server");
});