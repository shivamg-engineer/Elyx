import express from 'express';
import type { Request, Response } from 'express';
import * as middleware from 'i18next-http-middleware';
import { initI18next } from './i18.ts'; //  use .js for ESM

const app = express();

async function startServer() {
  const i18nextInstance = await initI18next();
  app.use(middleware.handle(i18nextInstance));

  app.get('/user/:name', (req: Request, res: Response) => {
    const userName = req.params.name;
    const message = req.t('welcome_user', { name: userName });
    res.json({ message });
  });

  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

startServer();
