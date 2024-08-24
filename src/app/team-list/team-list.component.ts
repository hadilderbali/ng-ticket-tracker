import { Component, OnInit } from '@angular/core';
import { Team } from '../model/Team';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';
import { Project } from '../model/Project';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams: Team[] = [];
team!: Team;
project!: Project;
  constructor(private projectService: ProjectService,private router:Router) { }

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    this.projectService.getAllTeams().subscribe(
      (teams: Team[]) => {
        this.teams = teams;
      },
      (error) => {
        console.error('Error fetching teams:', error);
      }
    );
  }

  viewTeamDetails(teamId: number): void {
    this.router.navigate(['/team-details', teamId]);
}
navigateToTeam(): void {
  this.router.navigate(['/createTeam']); // Navigate to the compose email component
}

}