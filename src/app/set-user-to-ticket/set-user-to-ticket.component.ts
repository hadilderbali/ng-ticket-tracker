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
  selectedUserId?: number;

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

  assignUser(): void {
    if (this.ticket && this.selectedUserId) {
      this.ticketService.assignTicketToUser(this.ticket.id, this.selectedUserId).subscribe(() => {
        this.successMessage = 'User assigned successfully';
        this.router.navigate(['/ticketList']);

      }, error => {
        console.error('Error assigning user:', error);
        this.successMessage = 'Failed to assign user';
      });
    } else {
      console.error('Ticket or user ID is missing');
    }
  }
  
}
