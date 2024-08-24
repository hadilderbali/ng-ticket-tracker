// src/app/models/notification-request.model.ts
export interface NotificationRequest {
    description: string;
    eventType: string; // Assuming Enum in backend, use string or create Enum in Angular
    enabled: boolean;
    category: string; // Same as eventType
  
    userIds?: number[]; // List of user IDs to send notifications to
  }
  