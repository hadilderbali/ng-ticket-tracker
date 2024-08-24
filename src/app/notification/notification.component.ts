import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../model/User';
import { NotificationService } from '../services/notification.service';
import { NotificationRequest } from '../model/NotificationRequest';
import { UnifiedSearchResult } from '../model/UnifiedSearchResult';
import { UnifiedSearchResponse } from '../model/UnifiedSearchResponse';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  notificationForm: FormGroup;
  users: User[] = [];
  selectedUsers: User[] = [];
  searchResults: User[] = [];
  unifiedSearchResults: UnifiedSearchResponse | null = null;
  selectedResultId: number | null = null;
  searchInitiated: boolean = false; // Flag to indicate if a search has been initiated
  unifiedSearchInitiated = false;

  eventTypes: string[] = ['TICKET_CREATED', 'TICKET_ASSIGNED', 'PROJECT_ASSIGNED', 'USER_ASSIGNED_TO_TEAM'];
  categories: string[] = ['INFO', 'WARNING', 'ERROR', 'SUCCESS', 'INCIDENT', 'SERVICE_REQUEST', 'CHANGE', 'IMPROVEMENT', 'ISSUE'];
  ticketIds: number[] = [];
  projectIds: number[] = [];
  teamIds: number[] = [];

  constructor(private fb: FormBuilder, private notificationService: NotificationService) {
    this.notificationForm = this.fb.group({
      eventType: [''],
      description: ['', Validators.required],
      category: ['', Validators.required],
      enabled: [false]
    });
  }

  ngOnInit(): void {}

 
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    if (searchTerm) {
      this.notificationService.searchUsersByName(searchTerm).subscribe((results: User[]) => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
  }

  onSelectUser(user: User): void {
    if (!this.selectedUsers.includes(user)) {
      this.selectedUsers.push(user);
    }
  }
  onEventTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const eventType = selectElement.value;
    console.log('Selected Event Type:', eventType);

  
  }

  toggleUserSelection(user: User): void {
    const index = this.selectedUsers.findIndex(u => u.userid === user.userid);
    if (index === -1) {
      this.selectedUsers.push(user);
    } else {
      this.selectedUsers.splice(index, 1);
    }
  }

  sendNotification(): void {
    if (this.notificationForm.invalid || this.selectedUsers.length === 0) {
      // Handle validation errors
      return;
    }

    const notificationRequest: NotificationRequest = {
      description: this.notificationForm.value.description,
      eventType: this.notificationForm.value.eventType,
      enabled: this.notificationForm.value.enabled,
      category: this.notificationForm.value.category,
      userIds: this.selectedUsers.map(user => user.userid)
    };

    this.notificationService.createNotification(notificationRequest)
      .subscribe(response => {
        window.alert(response);  // Show success message
      },
      error => {
        window.alert('Failed to create ticket');  // Show error message
      }
    );
  }
  

  onUnifiedSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    
    if (searchTerm) {

      this.unifiedSearchInitiated = true; 

      this.notificationService.unifiedSearch(searchTerm).subscribe((response: UnifiedSearchResponse) => {
        this.unifiedSearchResults = response;
        
      });
    } else {
      this.unifiedSearchResults = { tickets: [], projects: [], teams: [] };
    }
  }
  onSelectResult(result: any, type: string): void {
    const eventType = this.notificationForm.value.eventType;
    console.log('Selected Result:', result);
    console.log('Event Type:', eventType);
  
    if (eventType && result.id) {
      let projectIds: number[] = [];
      let ticketIds: number[] = [];
      let teamIds: number[] = [];
  
      // Populate the ID arrays based on the type
      if (type === 'PROJECT') {
        projectIds = [result.id];
      } else if (type === 'TICKET') {
        ticketIds = [result.id];
      } else if (type === 'TEAM') {
        teamIds = [result.id];
      }
      this.searchInitiated = true; // Mark search as initiated

  
      this.notificationService.getUsersBasedOnSelection(eventType, projectIds, ticketIds, teamIds)
        .subscribe(users => {
          console.log('Fetched Users:', users);
          this.searchResults = users;
          
        }, error => {
          console.error('Error fetching users:', error);
        });
    }
  }
  
  removeSelectedUser(user: User): void {
    this.selectedUsers = this.selectedUsers.filter(u => u !== user);
  }
  
  toggleEnabled(): void {
    const currentValue = this.notificationForm.value.enabled;
    this.notificationForm.patchValue({ enabled: !currentValue });
  }
  getUnifiedSearchPlaceholder(): string {
    const eventType = this.notificationForm.value.eventType;
    if (eventType) {
      return `Search by project, title, or teams related to ${eventType}`;
    }
    return 'Search by project, title, or teams';
  }

  // Method to toggle the notification enabled state
  toggleNotificationEnabled(): void {
    this.notificationForm.patchValue({ enabled: !this.notificationForm.value.enabled });
  }
}