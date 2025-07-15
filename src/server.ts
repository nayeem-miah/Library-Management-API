
import { Server } from "http"
import { app } from "./app";
import mongoose from "mongoose";

const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI as string

let server: Server;
const main = async () => {

    try {
        await mongoose.connect(uri)
        console.log("Db connecting............");
        server = app.listen(port, () => {
            console.log(`sever is running port hhttp://localhost:${port}`);
        })
    } catch (error) {
        console.error(error)
    }
}
main();