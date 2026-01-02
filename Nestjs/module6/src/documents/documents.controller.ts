import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/gaurds/jwt-auth.guard";
import { AbacGuard } from "src/auth/gaurds/abac.guard";
import { RolesGuard } from "src/auth/gaurds/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { AbacPolicy } from "src/auth/decorators/abac.decorator";
import { ViewDocumentPolicy } from "src/auth/gaurds/policies/document.policy";
import { CheckPolicy } from "src/auth/decorators/policy.decorator";

@Controller("documents")
@UseGuards(JwtAuthGuard, RolesGuard, AbacGuard)
export class DocumentsController {
  @Get()
  @Roles("admin", "hr")
  @AbacPolicy({ minAge: 18, department: "HR" })
  getDocuments() {
    return "Accessible only to HR users above 18";
  }

  @Get(":id")
  @AbacPolicy({ ownerField: "ownerId" })
  @CheckPolicy(new ViewDocumentPolicy())
  getDocument(@Param("id") id: string) {
    return {
      // id,
      // message: "Ownership validated by ABAC"
      message: "Access granted by PBAC policy",
      documentId: id,
    };
  }
}
