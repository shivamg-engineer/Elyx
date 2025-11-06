// Request Logging & Monitoring

// Add logging middleware to capture request and response data.

// TODO: Integrate a monitoring solution (e.g., PM2, or logs for performance analysis).

import express from "express";
import type { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  
  // When response finishes, log details
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${
        res.statusCode
      } (${duration}ms)`
    );
  });
  next(); // Move to next middleware or route
}

app.use(requestLogger);

app.get("/", (req: Request, res: Response) => {
  res.send("Request logging active!");
});

app.get("/slow", async (req: Request, res: Response) => {
  // Simulate slow operation
  await new Promise((resolve) => setTimeout(resolve, 1000));
  res.send("This request took 1 second!");
});


app.post("/data", (req: Request, res: Response)=>{
res.json({ received: req.body });
})

const port=8080;
app.listen(port,()=>{
     console.log(`Logging API running at http://localhost:${port}`);
})