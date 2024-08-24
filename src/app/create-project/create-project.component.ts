import { Component } from '@angular/core';
import { Project } from '../model/Project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  project: Project = {
    id: 0,
    nameP: '',
    description: '',
    createdDate: new Date().toISOString(), // Ensures date is set
    tickets: [],
    teams: []
  };
  successMessage: string = '';
  errorMessage: string = '';

  createdProject?: Project; // Store the created project

  constructor(private projectService: ProjectService) {}

  createProject(): void {
    if (!this.project.nameP.trim() || !this.project.description.trim()) {
      this.errorMessage = 'Project name and description are required.';
      return;
    }

    this.projectService.createProject(this.project).subscribe(
      (data) => {
        this.successMessage = 'Project created successfully!';
        this.project = data;  // Update the project details with the newly created project
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'There was an error creating the project.';
        this.successMessage = '';
      }
    );
  }
}