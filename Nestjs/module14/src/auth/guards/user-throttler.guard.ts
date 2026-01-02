

import { Injectable, ExecutionContext } from "@nestjs/common";
import { ThrottlerGuard } from "@nestjs/throttler";

@Injectable()
export class UserThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    try {
      // authenticated user - use user ID for throttling
      if (req.user && req.user.userId) {
        return `user-${req.user.userId}`;
      }
      
      // fallback for unauthenticated requests - use IP with proper fallback
      const ip = req.ip || 
                req.connection?.remoteAddress || 
                req.headers['x-forwarded-for'] as string || 
                req.headers['x-real-ip'] as string ||
                'unknown-ip';
      
      // Clean up IP address (remove port if present)
      const cleanIp = ip.split(',')[0].split(':').pop() || ip;
      
      return `ip-${cleanIp}`;
    } catch (error) {
      // Ultimate fallback
      return 'fallback-tracker';
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Ensure we have a tracker before throttling
    const tracker = await this.getTracker(request);
    request.throttlerTracker = tracker;
    
    return super.canActivate(context);
  }
}
