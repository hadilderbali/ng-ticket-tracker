// ticket.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { Router } from '@angular/router';
import { Project } from '../model/Project';
import { Status } from '../model/Ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticketForm: FormGroup;
  projects: Project[] = [];
  events: any[] = []; // Add a property for events
  statuses = Object.values(Status);

  constructor(private fb: FormBuilder, private ticketService: TicketService, private router: Router) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      projectId: ['', Validators.required],
      duration: [null, Validators.required],
      eventId: [''] // Add a field for event selection
    });
  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadEvents(); // Load events on initialization
  }

  loadProjects(): void {
    this.ticketService.getProjects().subscribe(
      data => {
        this.projects = data;
      },
      error => {
        console.error('Error loading projects', error);
      }
    );
  }

  loadEvents(): void {
    this.ticketService.getEvents().subscribe(
      data => {
        this.events = data;
      },
      error => {
        console.error('Error loading events', error);
      }
    );
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const { title, description, projectId, duration, eventId } = this.ticketForm.value;
      this.ticketService.createTicket(title, description, projectId, duration, eventId)
        .subscribe(response => {
          console.log(response);
          alert('Ticket created successfully');
          this.router.navigate(['/ticketList']); // Adjust the path as needed
        }, error => {
          console.error('Error creating ticket:', error);
          alert('Failed to create ticket');
        });
    }
  }
}
