import express from 'express';
import serverless from 'serverless-http';
import { router as rootRouter } from './routes/index.js'
import Config from './config/index.js';
import Cors from 'cors';

export async function handler(event, context) {
    const app = express();
    const { port } = Config.server;
    // Add CORS headers to allow everything
    app.use(Cors());
    app.use(express.json())
    app.use('/api/', rootRouter);
    return serverless(app)(event, context);
};

// Start it listening.
// app.listen(port, () => console.log(`Payments data app listening on port ${port}!`));