import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from '../gaurds/policies/policy.interface';

export const POLICY_KEY = 'policy';

export const CheckPolicy = (policy: PolicyHandler) =>
  SetMetadata(POLICY_KEY, policy);
