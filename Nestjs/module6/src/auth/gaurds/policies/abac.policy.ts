// policies/age.policy.ts
import { SetMetadata } from '@nestjs/common';
import { Policy } from './policy.interface';

// export const AbacPolicy = (policy: {
//   minAge?:number;
//   department?: string;
//   country?:string;

//   // 🔹 Resource attributes (Exercise 3)
//   ownerField?: string;
// })=> SetMetadata('abac_policy',policy);

export interface AbacPolicy {
  minAge?: number;
  department?: string;
  country?: string;

  // Exercise 3
  ownerField?: string;
}