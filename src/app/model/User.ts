import { Role } from "./Role";
import { Team } from "./Team";
import { Ticket } from "./Ticket";

export interface User {
    userid: number;
    username: string;
    userlastname: string;
    usermail: string;
    usertel: string;
    userpassword: string;
    capacity:number;
     ticket?:Ticket[]
    teams?: Team[]; // Optional, in case the user does not have teams or teams are not always needed
    notifications?: Notification[]; // Optional, in case the user does not have notifications or notifications are not always needed
    role:Role;
  }
  