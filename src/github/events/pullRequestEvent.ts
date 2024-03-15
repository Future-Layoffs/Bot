import { Request, Response, NextFunction } from 'express';

export const handlePullRequestOpened = async (req: Request, res: Response, next: NextFunction) => {
  // Assuming the payload is in req.body
  const payload = req.body;
  console.log(`Received a pull request event for #${payload.pull_request.number}`);
  // Perform your logic here
  res.status(200).json({ message: 'Pull request event processed' });
}