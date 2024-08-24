import { Project } from "./Project";
import { User } from "./User";

export interface Team {
    id: number;
    nameT: string;
    membreInteger:number;
    projects?: Project[]; 
    users?: User[]; 
  }