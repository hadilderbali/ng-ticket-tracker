// comment-response-dto.ts
export interface CommentResponseDTO {
    commentId: number;
    content: string;
    authorUsername: string;
    createdDate: string; // ISO date string
    ticketId: number;
    ticketTitle: string;
  }
  