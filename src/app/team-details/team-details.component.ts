import { Component, OnInit } from '@angular/core';
import { Team } from '../model/Team';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  teamId!: number;
  team: Team | null = null; // To hold the team details
teams: Team[] = [];
  constructor(
    private route: ActivatedRoute,
    private teamService: ProjectService,private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('teamId');
    if (id !== null) {
      this.teamId = +id; // Convert the string to a number
      this.teamService.getTeam(this.teamId).subscribe(
        (data) => {
          this.team = data;
        },
        (error) => {
          console.error('Error fetching team details:', error);
        }
      );
    } else {
      console.error('Team ID not found in route parameters.');
    }
  }

  goBack(): void {
    this.router.navigate(['/teams']); // Navigate to the home or previous route
  }
}