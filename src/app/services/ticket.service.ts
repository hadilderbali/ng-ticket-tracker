import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Status, Ticket } from '../model/Ticket';
import { Project } from '../model/Project';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private baseUrl = 'http://localhost:8089/business';

  constructor(private http: HttpClient) {}

  createTicket(title: string, description: string, projectId: number, duration?: number, eventId?: number): Observable<Ticket> {
    const body = { title, description, projectId, duration, existingEventId: eventId };
    return this.http.post<Ticket>(`${this.baseUrl}/Ticket/createTicket`, body);
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

  updateTicketStatus(id: number, status: Status): Observable<Ticket> {
    const url = `${this.baseUrl}/status/${id}/${status}`;
    return this.http.put<Ticket>(url, {});
  }
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
  assignTicketToUser(ticketId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/Ticket/${ticketId}/assign/${userId}`,{});
  }
  
  getUsersByTicket(ticketId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Ticket/tickets/${ticketId}/users`);
  }
}
