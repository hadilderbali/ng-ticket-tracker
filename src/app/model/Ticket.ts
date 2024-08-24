import { Project } from "./Project";
import { User } from "./User";

export interface Ticket {
    id: number;
    title: string;
    description: string;
    createdDate: string; // ISO 8601 string representation
    dateS: string; // ISO 8601 string representation
    dateF: string; // ISO 8601 string representation
    duration: number; 
    assignedUser?: User; // Add this line to include assigned user information

    status: Status; 
    project: Project; 

  }
  export enum Status {
    NEW='New',
    ASSIGNED = 'ASSIGNED',

    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED='RESOLVED',
    CLOSED = 'CLOSED',
    REOPENED = 'REOPENED', 
  }
  