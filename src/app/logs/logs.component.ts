import { Component, OnInit } from '@angular/core';
import { ChangeLog } from '../model/ChangeLog';
import { ActivatedRoute } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../model/Ticket';
import { User } from '../model/User';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: ChangeLog[] = [];
  ticketId!: number;
tickets:Ticket[] = [];
  constructor(private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.ticketId = +params.get('ticketId')!;
      this.loadLogs();
    });
  }

  loadLogs(): void {
    this.ticketService.getChangeLogs(this.ticketId).subscribe(
      (data: ChangeLog[]) => {
        this.logs = data;
      },
      (error) => {
        console.error('Error fetching change logs:', error);
      }
    );
  }

  formatDateString(dateInput: any): string {
    if (!dateInput) {
      return ''; // Return an empty string if dateInput is null or undefined
    }
  
    let date: Date;
  
    // Check if the input is an array (e.g., [2024, 12, 11])
    if (Array.isArray(dateInput)) {
      // Ensure the array has enough elements for Date constructor
      if (dateInput.length >= 3) {
        // Use default values for missing time components
        const year = dateInput[0];
        const month = dateInput[1] - 1; // months are zero-based
        const day = dateInput[2];
        const hour = dateInput[3] || 0;
        const minute = dateInput[4] || 0;
        const second = dateInput[5] || 0;
        
        date = new Date(year, month, day, hour, minute, second);
      } else {
        console.error('Invalid date array:', dateInput);
        return '';
      }
    } else if (typeof dateInput === 'string') {
      // Parse string input
      date = new Date(dateInput);
    } else {
      console.error('Unsupported date format:', dateInput);
      return ''; // Return an empty string if the format is unsupported
    }
  
    // Check if the date object is valid
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateInput);
      return ''; // Return an empty string if the date is invalid
    }
  
    // Return date in yyyy/mm/dd hh:mm:ss format
    return date.toISOString().slice(0, 19).replace('T', ' '); // Custom format
  }
  getUserName(users: User[]): string {
    return users.length > 0 ? users[0].username : 'No User';
  }
}