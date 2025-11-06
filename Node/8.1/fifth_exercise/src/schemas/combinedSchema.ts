import { userSchemaV1 } from "./userV1.ts";
import { userSchemaV2 } from "./userV2.ts";

export const combinedSchema = {
  anyOf: [userSchemaV1, userSchemaV2]
};