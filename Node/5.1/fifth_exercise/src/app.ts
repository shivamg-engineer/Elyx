// Unit Testing

// Write tests for your routes using Jest or Mocha.

// TODO: Ensure coverage for both success and error scenarios.

// jest: Testing framework

// ts-jest: Allows Jest to work with TypeScript

// supertest: For HTTP request testing against Express apps

import express from 'express';
import type { Request, Response } from 'express';

const app = express();
app.use(express.json());

app.get('/ping', (req: Request, res: Response) => {
  res.status(200).json({ message: 'pong' });
});

app.get('/error', (req: Request, res: Response) => {
  res.status(500).json({ error: 'Something went wrong' });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not Found' });
});

export default app;

// Only start server if running app.ts directly (not in tests)
if ((process.argv[1] ?? '').endsWith('app.ts')) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
