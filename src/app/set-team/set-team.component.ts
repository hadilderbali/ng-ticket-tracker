import { Component, OnInit } from '@angular/core';
import { Team } from '../model/Team';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Project } from '../model/Project';

@Component({
  selector: 'app-set-team',
  templateUrl: './set-team.component.html',
  styleUrls: ['./set-team.component.css']
})
export class SetTeamComponent implements OnInit {
  projectId!: number;
  project!: Project;
  teams: Team[] = [];
  filteredTeams: Team[] = [];
  selectedTeam!: Team | null;
  searchQuery: string = '';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projectIdStr = params.get('projectId');
      if (projectIdStr) {
        this.projectId = +projectIdStr;

        // Fetch the project details
        this.projectService.getProject(this.projectId).subscribe(project => {
          this.project = project;
        });

        // Fetch all teams and initialize filteredTeams
        this.projectService.getAllTeams().subscribe(teams => {
          this.teams = teams;
          this.filteredTeams = teams; // Initialize the filtered list
        });
      } else {
        console.error('Project ID is null');
      }
    });
  }

  onSearchTeam(): void {
    if (this.searchQuery.trim()) {
      this.filteredTeams = this.teams.filter(team =>
        team.nameT.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredTeams = this.teams;
    }
  }

  selectTeam(team: Team): void {
    this.selectedTeam = team;
  }

  affectTeamToProject(): void {
    if (this.selectedTeam) {
      this.projectService.assignTeamToProject(this.projectId, this.selectedTeam.id)
        .subscribe(updatedProject => {
          this.project = updatedProject;
          alert('Team successfully assigned to the project!');
        });
    }
  }
}
