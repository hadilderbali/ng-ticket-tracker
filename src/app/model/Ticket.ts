import { CommentDTO } from "./CommentDTO";
import { Project } from "./Project";
import { User } from "./User";

export interface Ticket {
    id: number;
    title: string;
    description: string;
    createdDate: string; // ISO 8601 string representation
    dateS: string; // ISO 8601 string representation
    deadline:string;
    dateF: string | null; // ISO 8601 string representation or null
    assignedUser: User[] ;  
     attachmentPath: string;
       frontOfficeAttachmentPath:string;
        status: Status; 
    project: Project; 
    comments: CommentDTO[]; // Add this line to include comments

    changeLogs: any[]; // Define the type for changeLogs if needed


  }
  export enum Status {
    NEW='New',
    ASSIGNED = 'ASSIGNED',

    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED='RESOLVED',
    CLOSED = 'CLOSED',
    REOPENED = 'REOPENED', 
  }
  