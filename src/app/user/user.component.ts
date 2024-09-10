import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Role } from '../model/Role';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[] = [];
  role!:Role;

  constructor(private projectService : ProjectService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.projectService.getAllUsers().subscribe(
      (data: any[]) => this.users = data,
      error => console.error('Error fetching users', error)
    );
  }
}