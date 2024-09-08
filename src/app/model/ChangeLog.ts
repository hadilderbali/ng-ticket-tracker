import { Ticket } from "./Ticket";
import { User } from "./User";

export interface ChangeLog {
    id: number;
    oldStatus: string;
    newStatus: string;
    changeDate: string;
    description: string;
    ticketId: number;
    ticketTitle: string;
    userId: number;
    userName: string;
    
  }
  