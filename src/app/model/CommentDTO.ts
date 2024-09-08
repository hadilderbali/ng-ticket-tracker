export interface CommentDTO {
    id: number;
    content: string;
    createdDate: string; // Ensure you handle this as a Date object if necessary
    authorId: number;
    authorName: string;
    ticketId: number;
}
