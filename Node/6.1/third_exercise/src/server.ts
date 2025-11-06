import express from 'express';
import type { Request, Response } from 'express';
import * as middleware from 'i18next-http-middleware';
import { initI18next } from './i18n.ts';


const app = express();

async function startServer() {
  const i18next = await initI18next(); // 👈 now this works
  app.use(middleware.handle(i18next));

  app.get('/', (req: Request, res: Response) => {
    res.json({ message: req.t('welcome') });
  });

  app.get('/goodbye',(req:Request,res:Response)=>{
    res.json({message:req.t('welcome')});
  })

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
