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
  selectedNotification: Notification | null = null;
  notifications: Notification[] = [];
  selectedCategory: string = 'Sent Notifications'; // Default category
  categories = Object.values(Category);
  dropdownOpen = false;

  constructor(
    private notificationService: NotificationService,
    private router: Router // Inject Router
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

  switchCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'Drafts') {
      this.notifications = this.drafts;
    } else if (category === 'Sent Notifications') {
      this.notifications = this.sentNotifications;
    }
  }

  selectNotification(notification: Notification): void {
    this.selectedNotification = notification;
  }

  enableNotification(id: number): void {
    this.notificationService.enableNotification(id, []).subscribe(response => {
      this.loadDrafts(); // Refresh drafts list after enabling
    });
  }

  navigateToCompose(): void {
    this.router.navigate(['/notification']); // Navigate to the compose email component
  }

  loadNotificationsByCategory(category: Category): void {
    this.notificationService.getNotificationsByCategory(category).subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    });
}

toggleCategoryDropdown(): void {
  this.dropdownOpen = !this.dropdownOpen;
}

selectCategory(category: Category): void {
  this.dropdownOpen = false; // Close dropdown after selection
  this.loadNotificationsByCategory(category);
}}