# Throttling Fix Plan

## Problems Identified:

1. **Missing Storage Configuration**: ThrottlerModule needs proper storage backend for @nestjs/throttler v6.5.0
2. **Guard Execution Order**: Throttling runs before JWT authentication, so `req.user` is undefined
3. **Throttling Logic**: UserThrottlerGuard doesn't handle unauthenticated requests properly
4. **Global Guard Configuration**: Using APP_GUARD for throttling conflicts with route-specific guards

## Solution Plan:

### Step 1: Configure Proper Storage Backend
- Add ThrottlerStorageRedisService or use in-memory storage with proper configuration
- Update ThrottlerModule configuration

### Step 2: Fix Guard Execution Order
- Remove global throttling guard (APP_GUARD)
- Apply throttling guard only on specific routes after JWT auth
- Ensure JWT auth runs before throttling

### Step 3: Fix UserThrottlerGuard
- Improve handling of unauthenticated requests
- Add better error handling and logging
- Ensure proper IP extraction

### Step 4: Update Route Configuration
- Apply guards in correct order on protected routes
- Test throttling functionality

## Implementation Steps:
1. Update app.module.ts to remove global throttling guard
2. Configure proper storage for throttler
3. Fix UserThrottlerGuard logic
4. Update users.controller.ts with proper guard order
5. Test the implementation
