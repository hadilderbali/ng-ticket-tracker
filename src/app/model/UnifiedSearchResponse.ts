import { Project } from "./Project";
import { Team } from "./Team";
import { Ticket } from "./Ticket";
import { UnifiedSearchResult } from "./UnifiedSearchResult";

export interface UnifiedSearchResponse {
  tickets: Ticket[];
  projects: Project[];
  teams: Team[];
  }