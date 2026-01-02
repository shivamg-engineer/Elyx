import { PolicyHandler } from "./policy.interface";
import { Request } from "@nestjs/common";

export class  ViewDocumentPolicy implements PolicyHandler{
    handle(user: any, request: Request): boolean {
         const documentOwnerId = 1; // simulate DB

         return (
            user && 
            (user.roles?.includes('admin') || 
            user.id === documentOwnerId)
         );
    }
}