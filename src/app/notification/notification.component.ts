import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../model/Ticket';
import { User } from '../model/User';
import { Category } from '../model/Notification';
import { AppEvent } from '../model/AppEvent';
import { Role } from '../model/Role';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  events: AppEvent[] = [];
  roles: Role[] = [];
  notificationForm: FormGroup;
  categories = Object.values(Category);
  message: string | null = null;
  success: boolean = false;
  selectedTicket?: Ticket;
  selectedUser?: User;
  autocompleteOptions: string[] = [];
  filteredOptions: string[] = [];

  constructor(
    private notificationService: NotificationService,
    private ticketService: TicketService,
    private fb: FormBuilder
  ) {
    this.notificationForm = this.fb.group({
      description: [''],
      eventName: [''],
      roleNames: [],
      enabled: [false],
      category: ['']
    });
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadRoles();
  }
  
  loadEvents(): void {
    this.ticketService.getEvents().subscribe(
      (data: AppEvent[]) => {
        this.events = data;
      },
      error => {
        console.error('Error fetching events', error);
      }
    );
  }

  loadRoles(): void {
    this.ticketService.getRoles().subscribe(
      (data: Role[]) => {
        this.roles = data;
      },
      error => {
        console.error('Error fetching roles', error);
      }
    );
  }

  onEventNameChange(): void {
    const eventName = this.notificationForm.get('eventName')?.value;

    if (eventName) {
      this.ticketService.getTicketsByEventAndRoles(eventName).subscribe(
        (tickets: Ticket[]) => {
          this.autocompleteOptions = tickets.map(ticket => ticket.title);
          
          if (tickets.length > 0) {
            this.selectedTicket = tickets[0];
            this.selectedUser = tickets[0].assignedUser[0]; // Handle user as an array
            
            console.log('Selected Ticket:', this.selectedTicket);
            console.log('Selected User:', this.selectedUser);
          } else {
            this.selectedTicket = undefined;
            this.selectedUser = undefined;
          }
        },
        error => {
          console.error('Error fetching tickets', error);
        }
      );
    }
  }

  onInputChange(): void {
    const inputValue = this.notificationForm.get('description')?.value.toLowerCase() || '';
    this.filteredOptions = this.autocompleteOptions.filter(option =>
      option.toLowerCase().includes(inputValue)
    );
  }

  onAutocompleteOptionSelected(option: string): void {
    const description = this.createDescription(option);
    this.notificationForm.get('description')?.setValue(description);
    this.filteredOptions = [];
  }

  createDescription(option: string): string {
    const ticketTitle = this.selectedTicket?.title || 'Unknown Ticket';
    const username = this.selectedUser?.username || 'Unknown User';
    const taskName = this.notificationForm.get('description')?.value || 'Unknown Task';

    return option
      .replace('Ticket %s is created by %s', `Ticket ${ticketTitle} is created by ${username}`)
      .replace('Ticket %s has been updated', `Ticket ${ticketTitle} has been updated`)
      .replace('User %s completed the task %s', `User ${username} completed the task ${taskName}`);
  }

  toggleEnabled(): void {
    const currentValue = this.notificationForm.get('enabled')?.value;
    this.notificationForm.patchValue({ enabled: !currentValue });
  }

  onSubmit(): void {
    if (this.notificationForm.valid) {
      const formValue = this.notificationForm.value;
  
      // Regardless of the value of 'enabled', send the form data to the backend
      this.notificationService.createNotification(formValue).subscribe(
        response => {
          if (formValue.enabled) {
            this.message = 'Notification sent successfully!';
          } else {
            this.message = 'Draft saved successfully!';
          }
          this.success = true;
        },
        error => {
          this.message = formValue.enabled ? 'Failed to send notification.' : 'Failed to save draft.';
          this.success = false;
        }
      );
    }
  }
}  