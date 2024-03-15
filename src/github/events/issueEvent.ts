import { Request, Response, NextFunction } from 'express';

export const handleIssueOpened = async (req: Request, res: Response, next: NextFunction) => {
  // Assuming the payload is in req.body
  const payload = req.body;
  console.log(`Received an issue event for #${payload.issue.number}`);
  // Perform your logic here
  res.status(200).json({ message: 'Issue event processed' });
};
