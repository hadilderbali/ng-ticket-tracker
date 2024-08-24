import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../model/Project';
import { Observable } from 'rxjs';
import { Team } from '../model/Team';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8089/business/'; 
  constructor(private http: HttpClient ) { }


  createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}Project/createProject`, project);
  }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}Project/getProject`);
  }

  
  assignTeamToProject(projectId: number, teamId: number): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}Project/${projectId}/assignTeam`, null, {
      params: { teamId: teamId.toString() }
    });
  }

  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}Project/Teams`);
  }
  searchTeamsByName(name: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}search/searchTeam?name=${name}`);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}Project/project/${id}`);
  }
  getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}Project/getTeam/${id}`);
  
}
createTeam(team: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}Project/team`, team);
}
searchUsersByName(name: string): Observable<User[]> {
  return this.http.get<User[]>(`${this.baseUrl}search/searchUser`, {
    params: { name }
  });
}
}

