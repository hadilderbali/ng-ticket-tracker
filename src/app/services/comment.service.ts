import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDTO } from '../model/CommentDTO'; // Adjust path as necessary
import { CommentResponseDTO } from '../model/CommentResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

    private apiUrl = 'http://localhost:8089/business/comment';

    constructor(private http: HttpClient) {}

    addComment(ticketId: number, userId: number, comment: CommentDTO): Observable<CommentDTO> {
        return this.http.post<CommentDTO>(`${this.apiUrl}/tickets/${ticketId}/users/${userId}/comments`, comment);
    }

    getCommentsForTicket(ticketId: number): Observable<CommentDTO[]> {
      return this.http.get<CommentDTO[]>(`${this.apiUrl}/tickets/${ticketId}/comments`);
    }
    getCommentsByWeek(): Observable<{ [key: string]: CommentResponseDTO[] }> {
      return this.http.get<{ [key: string]: CommentResponseDTO[] }>(`${this.apiUrl}/grouped-by-week`);
    }
  
  }
