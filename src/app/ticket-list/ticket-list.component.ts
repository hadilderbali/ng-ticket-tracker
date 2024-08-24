import { Component, OnInit } from '@angular/core';
import { Status, Ticket } from '../model/Ticket';
import { TicketService } from '../services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  paginatedTickets: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3; // Number of items per page
  totalItems: number = 0;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  // Define mapping for status to Bootstrap badge classes


  constructor(private ticketService: TicketService,private router:Router) {}

  ngOnInit(): void {
    this.loadTickets();
  }
  loadTickets(): void {
    this.ticketService.getAllTickets().subscribe((data: Ticket[]) => {
      console.log('Fetched tickets:', data);
      this.tickets = data;

      // Calculate pagination details here after tickets are loaded
      this.totalItems = this.tickets.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);

      // Update the paginated tickets after calculating the pagination details
      this.updatePaginatedTickets();
    });
  
  }

  editTicket(ticket: Ticket): void {
    // Handle the edit action here
    console.log('Edit ticket:', ticket);
  }

  getStatusClass(status: Status): string {
    switch (status) {
      case Status.NEW:
        return 'badge-primary'; // Adjust class if needed
      case Status.RESOLVED:
        return 'badge-success'; // Adjust class if needed
      case Status.IN_PROGRESS:
        return 'badge-warning'; // Adjust class if needed
      case Status.ASSIGNED:
        return 'badge-info'; // Adjust class if needed
      case Status.CLOSED:
        return 'badge-secondary'; // Adjust class if needed
      case Status.REOPENED:
        return 'badge-danger'; // Adjust class if needed
      default:
        return 'badge-secondary'; // Default class
    }
  }
  updatePaginatedTickets(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTickets = this.tickets.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedTickets();
  }
  navigateToTicket(): void {
    this.router.navigate(['/createTicket']); // Navigate to the compose email component
  }

  navigateToAffectUser(ticket: Ticket): void {
    if (ticket && ticket.id) {
      this.router.navigate(['/affect-user', ticket.id]);
    } else {
      console.error('Ticket ID is missing');
    }
}}