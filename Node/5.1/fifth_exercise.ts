// Unit Testing

// Write tests for your routes using Jest or Mocha.

// TODO: Ensure coverage for both success and error scenarios.

// jest: Testing framework

// ts-jest: Allows Jest to work with TypeScript

// supertest: For HTTP request testing against Express apps

import express from 'express';

const app = express();
app.use(express.json());

app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

app.get('/error', (req, res) => {
  res.status(500).json({ error: 'Something went wrong' });
});

export default app;
