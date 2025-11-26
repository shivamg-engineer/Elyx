import 'reflect-metadata';
import express from "express";
import dotenv from "dotenv";
import { requestLogger } from "./middleware/request-logger.ts";
import logger from "./config/logger.js";
import { i18nMiddleware } from "./config/i18n.ts";
import { setupSwagger } from "./config/swagger.ts";
import { AppDataSource } from "./database/typeorm-cli.ts";

import cartRouter from "./database/modules/cart/controllers/cart.controller.ts";
import orderRouter from "./database/modules/order/controllers/order.controller.ts";
import productRouter from "./database/modules/product/controllers/product.controller.ts";
import userRouter from "./database/modules/user/controllers/user.controller.ts";
import vendorRouter from "./database/modules/vendor/controllers/vendor.controller.ts";
import wishlistRouter from "./database/modules/wishlist/controllers/wishlist.controller.ts";

import userAuthRoutes from "./auth/controllers/user-auth.controller.ts";
import vendorAuthRoutes from "./auth/controllers/vendor-auth.controller.ts";

import { roleBasedLimiter } from "./middleware/roleLimiter.ts";

// Load environment variables first
dotenv.config();

const app = express();
app.use(express.json());

// Add middlewares
app.use(i18nMiddleware);
app.use(requestLogger);

// Example route
app.get("/", (req, res) => {
  const t = (req as any).t;
  const correlationId = (req as any).correlationId;

  logger.info(`Processing root request — Correlation ID: ${correlationId}`);

  res.json({
    message: t("welcome", { name: "Shivam" }),
    correlationId,
  });
});

app.use(roleBasedLimiter());

//
app.use("/api/v1/carts",cartRouter);
app.use("/api/v1/orders",orderRouter);
app.use("/api/v1/products",productRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/vendors", vendorRouter);
app.use("/api/v1/wishlists",wishlistRouter);

// register auth routes
app.use("/api/v1/auth/users", userAuthRoutes);
app.use("/api/v1/auth/vendors", vendorAuthRoutes);

// Swagger setup
setupSwagger(app);

const PORT = process.env.PORT || 3000;


AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port:${PORT}`);
    });
  })
  .catch((err:any) => {
    console.error("❌ DB connection failed:", err);
  });

  // node --loader ts-node/esm src/server.ts
