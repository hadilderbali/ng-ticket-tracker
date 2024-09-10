import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../services/ticket.service';
import { Router } from '@angular/router';
import { Project } from '../model/Project';
import { Status } from '../model/Ticket';
import { AppEvent } from '../model/AppEvent';
declare var bootstrap: any;

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  ticketForm: FormGroup;
  projects: Project[] = [];
  events: AppEvent[] = [];
  statuses = Object.values(Status);
  newEvent: AppEvent = { id: 0, name: '', dateEvent: '' };

  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private ticketService: TicketService, private router: Router) {
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      projectId: ['', Validators.required],
      eventId: ['']
    });
  }

  ngOnInit(): void {
    this.loadProjects();
    this.loadEvents();
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

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    } else {
      this.selectedFile = null;
    }
  }

  onSubmit(): void {
    if (this.ticketForm.valid) {
      const formData = new FormData();
      const { title, description, projectId, duration, eventId } = this.ticketForm.value;
  
      formData.append('title', title);
      formData.append('description', description);
      formData.append('projectId', projectId);
      if (eventId) {
        formData.append('existingEventId', eventId.toString());
      }
      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }
  
      this.ticketService.createTicket(formData).subscribe(response => {
        console.log(response);
        alert(response.message); // Assuming the response has a `message` field
        this.router.navigate(['/ticketList']);
      }, error => {
        console.error('Error creating ticket:', error);
        alert('Failed to create ticket');
      });
    }
  }
  

  openEventModal(): void {
    const modal = new bootstrap.Modal(document.getElementById('eventModal'));
    modal.show();
  }

  handleEventCreated(event: AppEvent): void {
    this.ticketService.addEvent(event).subscribe(response => {
      console.log('Event added:', response);
      this.loadEvents();
    }, error => {
      console.error('Error adding event:', error);
    });
  }
}
