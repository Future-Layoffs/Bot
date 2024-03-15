// github/githubApp.ts
import { App } from 'octokit';
import fs from 'fs';
import dotenv from 'dotenv';
import { createNodeMiddleware } from '@octokit/webhooks';
import express from 'express';
import { githubEventRouter } from './events';

dotenv.config();

const appId: string | undefined = process.env.APP_ID;
const webhookSecret: string | undefined = process.env.WEBHOOK_SECRET;
const privateKeyPath: string | undefined = process.env.PRIVATE_KEY_PATH;

if (!appId || !webhookSecret || !privateKeyPath) {
  throw new Error('Environment variables APP_ID, WEBHOOK_SECRET, or PRIVATE_KEY_PATH are not set.');
}

const privateKey: string = fs.readFileSync(privateKeyPath, 'utf8');

const app = new App({
  appId,
  privateKey,
  webhooks: {
    secret: webhookSecret,
  },
});

const expressApp = express();
const port: number = 3000;
const path: string = '/api/webhook';

expressApp.use(path, createNodeMiddleware(app.webhooks, { path: '/api/webhook' }));

expressApp.use('/api/github/events', githubEventRouter);

expressApp.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}${path}`);
});
