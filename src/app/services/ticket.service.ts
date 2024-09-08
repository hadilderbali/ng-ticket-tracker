import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Status, Ticket } from '../model/Ticket';
import { Project } from '../model/Project';
import { User } from '../model/User';
import { AppEvent } from '../model/AppEvent';
import { Role } from '../model/Role';
import { ChangeLog } from '../model/ChangeLog';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private baseUrl = 'http://localhost:8089/business';

  constructor(private http: HttpClient) {}
  createTicket(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Ticket/createTicket`, formData);
  }
  updateTicket(id: number, ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.baseUrl}/Ticket/updateticket/${id}`, ticket);
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Ticket/delete/${id}`);
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(`${this.baseUrl}/Ticket/getAll`);
  }

  getTicketById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.baseUrl}/Ticket/getById/${id}`)
  }

  /*updateTicketStatus(id: number, status: Status): Observable<Ticket> {
    const url = `${this.baseUrl}/status/${id}/${status}`;
    return this.http.put<Ticket>(url, {});
  }*/
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/Project/getProject`);
  }
  
  getOpenTicketsByWeek(startDate: string, endDate: string): Observable<Map<string, number>> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<Map<string, number>>(`${this.baseUrl}/Ticket/openTicketsByWeek`, { params });
  }

  getInProgressTicketsByWeek(startDate: string, endDate: string): Observable<Map<string, number>> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<Map<string, number>>(`${this.baseUrl}/Ticket/inProgressTicketsByWeek`, { params });
  }

  getResolvedTicketsByWeek(startDate: string, endDate: string): Observable<Map<string, number>> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<Map<string, number>>(`${this.baseUrl}/Ticket/resolvedTicketsByWeek`, { params });
  }

  getClosedTicketsByWeek(startDate: string, endDate: string): Observable<Map<string, number>> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<Map<string, number>>(`${this.baseUrl}/Ticket/closedTicketsByWeek`, { params });
  }
  getReOpenedTicketsByWeek(startDate: string, endDate: string): Observable<Map<string, number>> {
    return this.http.get<Map<string, number>>(`${this.baseUrl}/Ticket/ReOpenedTicketsByWeek`, {
      params: { startDate, endDate }
    });
  }
  getUserCapacityAndWorkload(startDate: string, endDate: string): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<any[]>(`${this.baseUrl}/Ticket/capacityAndWorkload`, { params });
  }
  getAverageTicketDuration(startDate: string, endDate: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/Ticket/average-ticket-duration?startDate=${startDate}&endDate=${endDate}`);
  } 
// ticket.service.ts
assignTicket(ticketId: number, usernames: string[], deadline: string): Observable<void> {
  const params = new HttpParams()
    .set('usernames', usernames.join(','))
    .set('deadline', deadline);
  
  return this.http.post<void>(`${this.baseUrl}/Ticket/${ticketId}/assign`, null, { params });
}
  getUsersByTicket(ticketId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Ticket/tickets/${ticketId}/users`);
  }
  getRoles(): Observable<Role[]> {
  return this.http.get<Role[]>(`${this.baseUrl}/events/Roles`);
  }
  getEvents(): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${this.baseUrl}/events`);
  }

  // Method to add a new event
  addEvent(event: AppEvent): Observable<AppEvent> {
    return this.http.post<AppEvent>(`${this.baseUrl}/events`, event);
  }

  // Method to update an existing event
  updateEvent(event: AppEvent): Observable<AppEvent> {
    return this.http.put<AppEvent>(`${this.baseUrl}/events/${event.id}`, event);
  }

  // Method to delete an event
  deleteEvent(eventId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/events/${eventId}`);
  }

  getFile(filePath: string): Observable<Blob> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Use `filePath` as a query parameter instead of a URL segment
    return this.http.get(`${this.baseUrl}/Ticket/files?filePath=${encodeURIComponent(filePath)}`, {
        headers: headers,
        responseType: 'blob'
    });
}
getTicketsByEventAndRoles(eventName: string): Observable<Ticket[]> {
  return this.http.get<Ticket[]>(`${this.baseUrl}/Ticket/getTicketTitle`, {
    params: {
      eventName: eventName,
    }
  });
}

getUserWorkload(): Observable<{ username: string, workload: number }[]> {
  return this.http.get<{ username: string, workload: number }[]>(`${this.baseUrl}/Ticket/userWorkload`);
}
getTicketsByUserId(userId: number): Observable<Ticket[]> {
  return this.http.get<Ticket[]>(`${this.baseUrl}/Ticket/user/${userId}`);
}

updateTicketStatus(ticketId: number, status: string, userId: number): Observable<Ticket> {
  const url = `${this.baseUrl}/Ticket/${ticketId}/status/${status}?userId=${userId}`;
  return this.http.patch<Ticket>(url, {});
}

getChangeLogs(ticketId: number): Observable<ChangeLog[]> {
  const url = `${this.baseUrl}/Ticket/Logs/${ticketId}`;
  return this.http.get<ChangeLog[]>(url);
}
getDoneTickets(userId: number): Observable<Ticket[]> {
  return this.http.get<Ticket[]>(`${this.baseUrl}/Ticket/done/${userId}`);
}

getInProgressTickets(userId: number): Observable<Ticket[]> {
  return this.http.get<Ticket[]>(`${this.baseUrl}/Ticket/in-progress/${userId}`);
}

getToDoTickets(userId: number): Observable<Ticket[]> {
  return this.http.get<Ticket[]>(`${this.baseUrl}/Ticket/to-do/${userId}`);
}
uploadFile(formData: FormData): Observable<string> {
  return this.http.post('http://localhost:8089/business/Ticket/upload', formData, { responseType: 'text' })
    .pipe(
      catchError(error => {
        console.error('Error uploading file:', error);
        return throwError(() => new Error(error.message || 'Server error'));
      })
    );
}

downloadFile(ticketId: number): Observable<Blob> {
  const url = `${this.baseUrl}/Ticket/download/${ticketId}`;
  return this.http.get(url, { responseType: 'blob' });
}

}

