import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationRequest } from '../model/NotificationRequest';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { UnifiedSearchResponse } from '../model/UnifiedSearchResponse';
import { Category, Notification } from '../model/Notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8089/business/'; 

  constructor(private http: HttpClient) { }
  createNotification(notificationRequest: NotificationRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}notifications`, notificationRequest);
  }
  searchUsersByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}search/searchUser`, {
      params: { name }
    });
  }
  unifiedSearch(name: string): Observable<UnifiedSearchResponse> {
    const params = new HttpParams().set('name', name);
    return this.http.get<UnifiedSearchResponse>(`${this.apiUrl}search/unified`, { params });
  
}
getUsersBasedOnSelection(eventType: string, projectIds: number[], ticketIds: number[], teamIds: number[]): Observable<User[]> {
  let params = new HttpParams().set('eventType', eventType);

  if (projectIds.length > 0) {
    params = params.set('projectIds', projectIds.join(','));
  }
  if (ticketIds.length > 0) {
    params = params.set('ticketIds', ticketIds.join(','));
  }
  if (teamIds.length > 0) {
    params = params.set('teamIds', teamIds.join(','));
  }

  return this.http.get<User[]>(`${this.apiUrl}notifications/users`, { params });
}

getDraftNotifications(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}notifications/drafts`);
}

getSentNotifications(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}notifications/sent`);
}

enableNotification(id: number): Observable<string> {
  return this.http.put<string>(`${this.apiUrl}notifications/enable/${id}`, {});
}

getNotificationsByCategory(category: Category): Observable<Notification[]> {
  return this.http.get<Notification[]>(`${this.apiUrl}notifications/category/${category}`);
}
resendNotification(notificationId: number): Observable<any> {
  return this.http.post(`${this.apiUrl}notifications/resendNotification`, { id: notificationId });
}
}
