import { Component, OnInit } from '@angular/core';
import { Project } from '../model/Project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent  implements OnInit {
  projects: Project[] = [];
  pagedProjects: Project[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6; // Number of items per page
  totalPages: number = 0;
  totalPagesArray: number[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(
      (data) => {
        this.projects = data;
        this.totalPages = Math.ceil(this.projects.length / this.itemsPerPage);
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
        this.updatePagedProjects();
      },
      (error) => {
        console.error('There was an error fetching the projects:', error);
      }
    );
  }

  updatePagedProjects(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedProjects = this.projects.slice(startIndex, endIndex);
    console.log('Paged Projects:', this.pagedProjects); // Debugging
  }
  

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedProjects();
    }
  }
}
