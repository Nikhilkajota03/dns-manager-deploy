import express from 'express';
import bodyParser from 'body-parser';
import mongodbConnection from "./database/db.js";

import userRouter from './routes/routeUser.js';
import dnsRecordsRouter from './routes/routeDNSRecord.js';
import domainRouter from './routes/routeDomain.js';
import cors from 'cors';


const app = express.Router();

// parse application/json
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/dns-records', dnsRecordsRouter);
app.use('/api/v1/domain', domainRouter);

mongodbConnection(); 

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
