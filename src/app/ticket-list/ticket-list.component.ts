// ticket-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Status, Ticket } from '../model/Ticket';
import { TicketService } from '../services/ticket.service';
import { Router } from '@angular/router';
import { CommentResponseDTO } from '../model/CommentResponseDTO';
import { CommentService } from '../services/comment.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  paginatedTickets: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  totalPagesArray: number[] = [];
  commentsByWeek: { [key: string]: CommentResponseDTO[] } = {};
  currentCommentPage: { [key: string]: number } = {};
  itemsPerCommentPage: number = 2; // Number of comments 
  totalCommentPagesByWeek: { [key: string]: number } = {};

  constructor(private ticketService: TicketService, private router: Router,private commentService:CommentService) {}

  ngOnInit(): void {
    this.loadTickets();
    this.loadCommentsByWeek();
  }

  loadTickets(): void {
    this.ticketService.getAllTickets().subscribe((data: Ticket[]) => {
      this.tickets = data.map(ticket => ({
        ...ticket,
        dateS: this.formatDateString(ticket.dateS),
        dateF: this.formatDateString(ticket.dateF),
        deadline: this.formatDateString(ticket.deadline),
      }));
      this.totalItems = this.tickets.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      this.updatePaginatedTickets();
    });
  }

    loadCommentsByWeek(): void {
      // Assuming you're fetching the comments grouped by week from a service
      this.commentService.getCommentsByWeek().subscribe((data) => {
        this.commentsByWeek = data;
        for (let week in this.commentsByWeek) {
          this.currentCommentPage[week] = 1; // Initialize the current page for each week
        }
      });
    }
  
    getPaginatedComments(week: string): any[] {
      const startIndex = (this.currentCommentPage[week] - 1) * this.itemsPerCommentPage;
      return this.commentsByWeek[week].slice(startIndex, startIndex + this.itemsPerCommentPage);
    }
  
    getTotalCommentPages(week: string): number {
      return Math.ceil(this.commentsByWeek[week].length / this.itemsPerCommentPage);
    }
  
    changeCommentPage(event: Event, week: string, page: number): void {
      event.preventDefault(); // Prevent the default anchor behavior
      if (page < 1 || page > this.getTotalCommentPages(week)) return;
      this.currentCommentPage[week] = page;
    }
  getWeekKeys(): string[] {
  return Object.keys(this.commentsByWeek);
}

  formatDateString(dateInput: any): string {
    if (!dateInput) {
      return '';
    }
    let date: Date;
    if (Array.isArray(dateInput)) {
      if (dateInput.length >= 5) {
        date = new Date(dateInput[0], dateInput[1] - 1, dateInput[2], dateInput[3], dateInput[4]);
      } else {
        console.error('Invalid date array:', dateInput);
        return '';
      }
    } else if (typeof dateInput === 'string') {
      date = new Date(dateInput);
    } else {
      console.error('Unsupported date format:', dateInput);
      return '';
    }
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateInput);
      return '';
    }
    return date.toISOString();
  }

  editTicket(ticket: Ticket): void {
    console.log('Edit ticket:', ticket);
  }

  getStatusClass(status: Status): string {
    switch (status) {
      case Status.NEW:
        return 'badge-primary';
      case Status.RESOLVED:
        return 'badge-success';
      case Status.IN_PROGRESS:
        return 'badge-warning';
      case Status.ASSIGNED:
        return 'badge-info';
      case Status.CLOSED:
        return 'badge-secondary';
      case Status.REOPENED:
        return 'badge-danger';
      default:
        return 'badge-secondary';
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
    this.router.navigate(['/createTicket']);
  }

  navigateToAffectUser(ticket: Ticket): void {
    if (ticket && ticket.id) {
      this.router.navigate(['/affect-user', ticket.id]);
    } else {
      console.error('Ticket ID is missing');
    }
  }
  showLogs(ticketId: number): void {
    this.router.navigate(['/logs', ticketId]);
  }
  downloadFile(ticketId: number): void {
    this.ticketService.downloadFile(ticketId).subscribe(
      (fileBlob: Blob) => {
        const url = window.URL.createObjectURL(fileBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ticket_${ticketId}_file`; // Customize file name as needed
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
}

