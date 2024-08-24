import { Team } from "./Team";
import { Ticket } from "./Ticket";

export interface Project {
    id: number;
    nameP: string;
    description: string;
    createdDate: string;
    tickets?: Ticket[]; // Optional, in case the project does not have tickets or tickets are not always needed
    teams?: Team[]; // Optional, in case the project does not have teams or teams are not always needed
  }
  