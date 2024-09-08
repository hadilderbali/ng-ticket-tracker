import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Category, Notification } from '../model/Notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  drafts: Notification[] = [];
  sentNotifications: Notification[] = [];
  selectedNotification: Notification | null = null;   notifications: Notification[] = [];
  selectedCategory: string = 'Sent Notifications'; 
  categories = Object.values(Category);
  dropdownOpen = false;
  successMessage: string | null = null;

  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSentNotifications();
    this.loadDrafts();
  }

  loadDrafts(): void {
    this.notificationService.getDraftNotifications().subscribe((drafts: Notification[]) => {
      this.drafts = drafts;
      if (this.selectedCategory === 'Drafts') {
        this.notifications = drafts;
      }
    });
  }

  loadSentNotifications(): void {
    this.notificationService.getSentNotifications().subscribe((sentNotifications: Notification[]) => {
      this.sentNotifications = sentNotifications;
      if (this.selectedCategory === 'Sent Notifications') {
        this.notifications = sentNotifications;
      }
    });
  }
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.dropdownOpen = false;
    this.selectedNotification = null;

    // Update the notifications array based on the selected category
    this.updateNotifications();
  }

  // Switches the category (Drafts or Sent Notifications) and resets the selected notification
  switchCategory(category: string) {
    this.selectedCategory = category;
    this.selectedNotification = null;
    this.updateNotifications();
  }

  // Updates the notifications array based on the selected category
  private updateNotifications() {
    if (this.selectedCategory === 'Drafts') {
      this.notifications = this.drafts;
    } else if (this.selectedCategory === 'Sent Notifications') {
      this.notifications = this.sentNotifications;
    }
  }

  selectNotification(notification: Notification): void {
    this.selectedNotification = notification;
  }

 
  enableNotification(id: number): void {
    this.notificationService.enableNotification(id).subscribe(
      response => {
        // Simulate success message with a window alert
        window.alert('Notification enabled successfully!');
        this.loadDrafts(); // Refresh drafts list
      },
      error => {
        // Simulate error message with a window alert
        window.alert('Notification enabled successfully!');
      }
    );
  }


  navigateToCompose(): void {
    this.router.navigate(['/notification']);
  }

  loadNotificationsByCategory(category: Category): void {
    this.notificationService.getNotificationsByCategory(category).subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    });
  }

  toggleCategoryDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

}
