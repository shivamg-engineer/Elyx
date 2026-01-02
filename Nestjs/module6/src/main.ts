import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { RolesGuard } from "./auth/gaurds/roles.guard";
import { Reflector } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  // ⚠️ TEMP: mock authenticated user
  app.use((req, res, next) => {
    req.user = {
      id: 1,
      name: "Shivam",
      age: 22,
      department: "HR",
      role: "admin",
    }; // change to 'user' to test 403
    next();
  });
  app.useGlobalGuards(new RolesGuard(reflector));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
