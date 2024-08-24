import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { User } from '../model/User';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  team = {
    nameT: '',
    membre: 0,
    userIds: [] as number[]
  };
  users = [] as any[];
  filteredUsers = [] as any[];
  allUsers: User[] = []; // This will store all users fetched from the server
  successMessage: string = ''; // Variable to store success message

  constructor(private teamService: ProjectService) { }

  ngOnInit(): void {
    this.filteredUsers = this.users;
  }



  searchUsers(event: Event): void {
    const input = event.target as HTMLInputElement;
    const query = input.value.toLowerCase();

    if (query) {
      this.teamService.searchUsersByName(query).subscribe(users => {
        this.filteredUsers = users;
      });
    } else {
      this.filteredUsers = []; // Clear the filtered users when input is empty
    }
  }

  toggleUserSelection(user: any): void {
    const index = this.team.userIds.indexOf(user.userid);
    if (index === -1) {
      this.team.userIds.push(user.userid);
    } else {
      this.team.userIds.splice(index, 1);
    }
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.teamService.createTeam(this.team).subscribe(
        response => {
          this.successMessage = 'Team created successfully!';
          form.reset(); // Optionally reset the form after submission
          this.filteredUsers = []; // Clear search results
        },
        error => {
          // Handle error case
          console.error('Error creating team:', error);
        }
      );
    }
  }
}
