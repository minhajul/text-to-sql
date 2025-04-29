import express from 'express';
import {createServer} from 'http';
import 'dotenv/config';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import routes from "./routes.js";
import helmet from "helmet";

dotenv.config();

const app = express();
app.use(helmet());
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use("/api/generate-query", routes);

// Global Error Handler (Prevents Server Crash)
app.use((err, req, res, next) => {
    console.error("Unexpected Error:", err);
    res.status(500).json({error: "Internal Server Error"});
});

const httpServer = createServer(app);

const PORT = process.env.PORT || 5001;
httpServer.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
