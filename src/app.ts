import express from "express"
import * as dotevnv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

dotevnv.config()

import sequelize from './config/sequelize'; 

import { mainRouter } from "./routes";

import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

if (!process.env.PORT) {
    console.log(`No port value specified...`)
}

const PORT = parseInt(process.env.PORT as string, 10)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use("/api", mainRouter);

app.use(errorHandler);
app.use(notFoundHandler);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Connection has been established successfully.');
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
