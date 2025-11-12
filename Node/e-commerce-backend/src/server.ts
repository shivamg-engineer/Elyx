import express from 'express';
import { requestLogger } from './middleware/request-logger.ts';
import logger from './config/logger.ts';
import { i18nMiddleware } from './config/i18n.ts';
import { setupSwagger } from './config/swagger.ts';

const app = express();
app.use(express.json());

// Add middlewares
app.use(i18nMiddleware);
app.use(requestLogger);

// Example route
app.get('/', (req, res) => {
  const t = (req as any).t;
  const correlationId = (req as any).correlationId;
  logger.info(`Processing root request — Correlation ID: ${correlationId}`);
  res.json({
    message: t('welcome', { name: 'Shivam' }),
    correlationId,
  });
});


// Swagger setup
setupSwagger(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});
export default app;
