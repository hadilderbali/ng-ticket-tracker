// ticket-user.component.ts
import { Component, OnInit } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Router } from '@angular/router';
import { Status, Ticket } from '../model/Ticket';

@Component({
  selector: 'app-ticket-user',
  templateUrl: './ticket-user.component.html',
  styleUrls: ['./ticket-user.component.css']
})
export class TicketUserComponent implements OnInit {
  tickets: Ticket[] = [];
  userId = 1; // Example user ID, adjust as needed
  doneTickets: Ticket[] = [];
  inProgressTickets: Ticket[] = [];
  toDoTickets: Ticket[] = [];
  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  loadTickets(): void {
    this.ticketService.getTicketsByUserId(this.userId).subscribe((data: Ticket[]) => {
      this.tickets = data;
      this.doneTickets = this.tickets.filter(ticket => ticket.status === Status.RESOLVED || ticket.status === Status.CLOSED);
      this.inProgressTickets = this.tickets.filter(ticket => ticket.status === Status.IN_PROGRESS || ticket.status === Status.REOPENED);
      this.toDoTickets = this.tickets.filter(ticket => ticket.status === Status.NEW || ticket.status === Status.ASSIGNED);
    });
  }

  getUserName(users: any[]): string {
    return users.length > 0 ? users[0].username : 'No User';
  }

  getUserCapacity(users: any[]): number {
    return users.length > 0 ? users[0].capacity : 0;
  }

  treatTicket(ticketId: number): void {
    this.router.navigate(['/ticket-treatment', ticketId]);
  }

  downloadAttachment(filePath: string): void {
    this.ticketService.getFile(filePath).subscribe(
      (fileBlob: Blob) => {
        const url = window.URL.createObjectURL(fileBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filePath.substring(filePath.lastIndexOf('/') + 1); // Extract file name for download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading file:', error);
      }
    );
  }

  formatDateString(dateInput: any): string {
    if (!dateInput) {
      return ''; // Return an empty string if dateInput is null or undefined
    }
    
    let date: Date;

    // Check if the input is an array (e.g., [2024, 12, 24, 0, 0])
    if (Array.isArray(dateInput)) {
      // Ensure the array has enough elements for Date constructor
      if (dateInput.length >= 5) {
        date = new Date(dateInput[0], dateInput[1] - 1, dateInput[2], dateInput[3], dateInput[4]);
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
    
    return date.toISOString(); // Convert valid date to ISO string format
  }
}
