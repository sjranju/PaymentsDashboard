// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express from "express";
import serverless from "serverless-http";
import Config from './config/index.js';
import Cors from 'cors';
import { router as rootRouter } from './routes/index.js'
const { port } = Config.server;

const api = express();
// Add CORS headers to allow everything
app.use(Cors());
app.use(express.json())

export const handler = serverless(api);

app.use('/api/', rootRouter);

// Start it listening.
app.listen(port, () => console.log(`Payments data app listening on port ${port}!`));