import { Project } from "./Project";
import { Team } from "./Team";
import { Ticket } from "./Ticket";


export interface UnifiedSearchResult {
  id: number;
  name: string;
  type: 'ticket' | 'project' | 'team';
}
