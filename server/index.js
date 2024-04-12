import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dbConnection from './dbConfig/index.js';
import router from "./Routes/index.js";
import errorMiddleware from './Middleware/errorMiddleware.js';
//Security Packages
import helmet from 'helmet';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

dbConnection();
//Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use(router);

//error middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});