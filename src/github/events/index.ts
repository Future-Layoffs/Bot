import { Router } from 'express';
import { handleIssueOpened } from './issueEvent';
import { handlePullRequestOpened } from './pullRequestEvent';

const router = Router();

// Define routes for specific GitHub event types
// Assuming GitHub sends a specific header or payload property to differentiate events
router.post('/issues', handleIssueOpened);
router.post('/pull-requests', handlePullRequestOpened);

export { router as githubEventRouter };