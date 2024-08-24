export class Notification{
    idN!: number;
    description!: string;
    date!: Date;
    notification_read!: boolean;
    enabled!: boolean;
    eventType!: EventType; 
    category!: Category; 
}
export enum EventType{
    TICKET_CREATED="TICKET_CREATED",
    TICKET_ASSIGNED="TICKET_ASSIGNED",
    TICKET_COMPLETED="TICKET_COMPLETED",
    PROJECT_ASSIGNED="PROJECT_ASSIGNED",
    PROJECT_UPDATED="PROJECT_UPDATED ",
    USER_ASSIGNED_TO_TEAM="USER_ASSIGNED_TO_TEAM",



}
export enum Category{
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    SUCCESS = 'SUCCESS',
    INCIDENT = 'INCIDENT',
    SERVICE_REQUEST = 'SERVICE_REQUEST',
    CHANGE = 'CHANGE',
    IMPROVEMENT = 'IMPROVEMENT',
    ISSUE = 'ISSUE'

}

