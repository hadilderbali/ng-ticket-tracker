import { User } from "./User";

export class Notification{
    idN!: number;
    description!: string;
    date!: Date;
    notification_read!: boolean;
    enabled!: boolean;
    category!: Category; 
    users?: User[];
}

export enum Category{
    INFORMATIONAL = 'INFORMATIONAL',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    INCIDENT = 'INCIDENT',
    SERVICE_REQUEST = 'SERVICE_REQUEST',
    CHANGE = 'CHANGE',
    IMPROVEMENT = 'IMPROVEMENT',
    ISSUE = 'ISSUE'

}

