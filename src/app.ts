import express, { Request, Response } from 'express';
import dotenv from "dotenv";
export const app = express();
app.use(express.json());
dotenv.config()

app.get("/", async (req: Request, res: Response) => {
    res.send("Hello server");
});