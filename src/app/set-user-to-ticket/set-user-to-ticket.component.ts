import { Component, OnInit } from '@angular/core';
import { Ticket } from '../model/Ticket';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { User } from '../model/User';

@Component({
  selector: 'app-set-user-to-ticket',
  templateUrl: './set-user-to-ticket.component.html',
  styleUrls: ['./set-user-to-ticket.component.css']
})
export class SetUserToTicketComponent implements OnInit {
  ticket?: Ticket;
  availableUsers: User[] = [];
  successMessage: string = '';
  selectedUsernames : string[] = [];;
  deadline: string | null = null; // Updated to string

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService, private router: Router 
  ) {}

  ngOnInit(): void {
    const ticketId = this.route.snapshot.paramMap.get('ticketId');
    if (ticketId) {
      this.loadTicketDetails(+ticketId);
    } else {
      console.error('Ticket ID is missing in the route parameters.');
    }
  }

  loadTicketDetails(ticketId: number): void {
    this.ticketService.getTicketById(ticketId).subscribe(ticket => {
      this.ticket = ticket;
      this.loadUsersForTicket(ticketId);
    }, error => {
      console.error('Error loading ticket details:', error);
    });
  }

  loadUsersForTicket(ticketId: number): void {
    this.ticketService.getUsersByTicket(ticketId).subscribe(users => {
      this.availableUsers = users;
    }, error => {
      console.error('Error loading users:', error);
    });
  }

// set-user-to-ticket.component.ts
assignUsers(): void {
  if (this.ticket && this.selectedUsernames && this.selectedUsernames.length > 0 && this.deadline) {
    this.ticketService.assignTicket(this.ticket.id, this.selectedUsernames, this.deadline).subscribe(() => {
      this.successMessage = 'Users and deadline assigned successfully';
      this.router.navigate(['/ticketList']);
    }, error => {
      console.error('Error assigning users:', error);
      this.successMessage = 'Failed to assign users';
    });
  } else {
    console.error('Ticket, usernames, or deadline are missing');
  }
}

downloadAttachment(filePath: string): void {
    this.ticketService.getFile(filePath).subscribe(
        (fileBlob: Blob) => {
            const url = window.URL.createObjectURL(fileBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filePath.substring(filePath.lastIndexOf('/') + 1);  // Extract file name for download
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        },
        error => {
            console.error('Error downloading file:', error);
        }
    );
  }}
