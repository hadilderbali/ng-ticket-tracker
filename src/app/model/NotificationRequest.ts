// src/app/models/notification-request.model.ts
export interface NotificationRequest {
  description: string;  // A description of the notification
  eventName: string;    // The name of the event associated with the notification
  roleNames: string[];  // A list of role names associated with the notification
  enabled: boolean;     // A boolean indicating if the notification is enabled
  category: string; 
  
  }
  