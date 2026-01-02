# TODO: Fix Throttling and Authentication Issues

## Problems Identified:
1. **401 Unauthorized**: JWT secrets not configured, guard execution order issues
2. **Throttling Not Working**: Missing storage configuration, incorrect guard execution order

## Plan:

### Step 1: Fix JWT Configuration and Auth Flow
- [ ] Fix JWT secrets configuration in .env
- [ ] Fix JWT strategy to handle payload correctly
- [ ] Fix auth service to generate tokens properly

### Step 2: Fix Guard Execution Order
- [ ] Ensure JWT authentication runs before throttling
- [ ] Update UserThrottlerGuard to handle unauthenticated requests gracefully
- [ ] Configure proper global guard execution order

### Step 3: Configure Throttling Properly
- [ ] Ensure ThrottlerModule is properly configured with storage
- [ ] Test throttling functionality
- [ ] Add rate limit headers to responses

### Step 4: Test the Fixes
- [ ] Test authentication endpoints
- [ ] Test throttling limits
- [ ] Verify per-user throttling works

## Current Status:
- JWT secrets configured in .env
- Guard execution order fixed (JWT auth before throttling)
- Next: Fix JWT strategy and auth service
