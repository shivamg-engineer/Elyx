import { SetMetadata } from "@nestjs/common";

export const AbacPolicy = (policy: {
  minAge?:number;
  department?: string;
  country?:string;

  // 🔹 Resource attributes (Exercise 3)
  ownerField?: string;
})=> SetMetadata('abac_policy',policy);