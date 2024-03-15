// Import necessary modules
import express from 'express';
import { WebhookEvent } from '@octokit/webhooks-types';
import dotenv from 'dotenv';
import { App } from 'octokit';
import { createNodeMiddleware } from '@octokit/webhooks';
import fs from 'fs';


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


async function handleIssueOpened({ octokit, payload }: any) {
  console.log(`Received an issue event for #${payload.issue.number}`);
}

app.webhooks.on('issues.opened', handleIssueOpened);

app.webhooks.onError((error: Error | any) => {
  if (error.name === 'AggregateError') {
    console.error(`Error processing request: ${error.event}`);
  } else {
    console.error(error);
  }
});

const expressApp = express();
const port: number = 3000;
const path: string = '/api/webhook';

expressApp.use(path, createNodeMiddleware(app.webhooks));


expressApp.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}${path}`);
});
