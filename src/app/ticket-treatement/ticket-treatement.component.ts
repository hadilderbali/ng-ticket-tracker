import { Component, OnInit } from '@angular/core';
import { Status, Ticket } from '../model/Ticket';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from '../services/ticket.service';
import { CommentService } from '../services/comment.service';
import { User } from '../model/User';
import { ProjectService } from '../services/project.service';
import { CommentDTO } from '../model/CommentDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeLog } from '../model/ChangeLog';

@Component({
  selector: 'app-ticket-treatement',
  templateUrl: './ticket-treatement.component.html',
  styleUrls: ['./ticket-treatement.component.css']
})
export class TicketTreatementComponent implements OnInit {
  ticket: Ticket | undefined;
  statusForm: FormGroup;
  commentForm: FormGroup;
  selectedStatus: string = ''; 
  statusOptions: string[] = ['IN_PROGRESS', 'RESOLVED', 'CLOSED', 'REOPENED'];
  userId: number = 1; // Replace with actual user ID or get it dynamically
  user!: User;
  ticketId!: number;
  comments: CommentDTO[] = []; 
  changeLogs: ChangeLog[] = [];
  fileForm: FormGroup;
  showComments: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private commentService: CommentService,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.statusForm = this.fb.group({
      status: ['']
    });
    this.commentForm = this.fb.group({
      comment: ['']
    });
    this.fileForm = this.fb.group({
      file: [null]
    });
  }

  ngOnInit(): void {
    this.getTicketDetails();
    this.getUser();
  }

  toggleComments(): void {
    this.showComments = !this.showComments;
  }

  getTicketDetails(): void {
    const id = Number(this.route.snapshot.paramMap.get('ticketId'));
    this.ticketId = id;
    this.ticketService.getTicketById(id).subscribe(
      (ticket) => {
        this.ticket = ticket;
        console.log('Fetched ticket:', this.ticket);
        this.loadCommentsForTicket(id); // Load comments
      },
      (error) => {
        console.error('Error fetching ticket details:', error);
      }
    );
  }

  loadCommentsForTicket(ticketId: number): void {
    this.commentService.getCommentsForTicket(ticketId).subscribe(
      (comments) => {
        if (this.ticket) {
          this.ticket.comments = comments; // Ensure comments are set
        }
        console.log('Fetched comments:', comments);
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  updateStatus(): void {
    const status = this.statusForm.get('status')?.value;
    if (this.ticketId && status) {
      this.ticketService.updateTicketStatus(this.ticketId, status, this.userId).subscribe(
        (response) => {
          this.snackBar.open('Ticket status updated successfully!', 'Close', { duration: 3000 });
          this.getTicketDetails(); // Refresh ticket details
          this.getChangeLogs(); // Optionally refresh change logs
        },
        (error) => {
          console.error('Error updating ticket status:', error);
        }
      );
    } else {
      console.error('Cannot update status: ticketId or status is undefined');
    }
  }

  getChangeLogs(): void {
    if (this.ticketId) {
      this.ticketService.getChangeLogs(this.ticketId).subscribe(
        (logs) => {
          this.changeLogs = logs;
        },
        (error) => {
          console.error('Error fetching change logs:', error);
        }
      );
    }
  }

  addComment(): void {
    if (this.ticket && this.user && this.user.username) {
      const comment: CommentDTO = {
        content: this.commentForm.value.comment,
        authorId: this.userId,
        authorName: this.user.username,
        ticketId: this.ticket.id,
        id: 0,
        createdDate: new Date().toISOString(),
      };

      this.commentService.addComment(this.ticket.id, this.userId, comment).subscribe(
        () => {
          this.snackBar.open('Comment added successfully!', 'Close', { duration: 3000 });
          this.getTicketDetails(); // Refresh ticket details
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
    } else {
      console.error('Ticket or User information is missing.');
    }
  }


getUser(): void {
  // Replace with your logic to get the user
  this.projectService.getUser(this.userId).subscribe(
    (user) => {
      this.user = user;
    },
    (error) => {
      console.error('Error fetching user:', error);
    }
  );
}


formatDateString(dateInput: any): string {
  if (!dateInput) {
    return ''; // Return an empty string if dateInput is null or undefined
  }

  let date: Date;

  // Check if the input is an array (e.g., [2024, 12, 11])
  if (Array.isArray(dateInput)) {
    // Ensure the array has enough elements for Date constructor
    if (dateInput.length >= 3) {
      // Use default values for missing time components
      const year = dateInput[0];
      const month = dateInput[1] - 1; // months are zero-based
      const day = dateInput[2];
      const hour = dateInput[3] || 0;
      const minute = dateInput[4] || 0;
      const second = dateInput[5] || 0;
      
      date = new Date(year, month, day, hour, minute, second);
    } else {
      console.error('Invalid date array:', dateInput);
      return '';
    }
  } else if (typeof dateInput === 'string') {
    // Parse string input
    date = new Date(dateInput);
  } else {
    console.error('Unsupported date format:', dateInput);
    return ''; // Return an empty string if the format is unsupported
  }

  // Check if the date object is valid
  if (isNaN(date.getTime())) {
    console.error('Invalid date string:', dateInput);
    return ''; // Return an empty string if the date is invalid
  }

  // Return date in yyyy/mm/dd hh:mm:ss format
  return date.toISOString().slice(0, 19).replace('T', ' '); // Custom format
}

onFileChange(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (allowedTypes.includes(file.type)) {
      this.selectedFile = file;
      console.log('Selected file:', file);
    } else {
      this.selectedFile = null;
      this.snackBar.open('Unsupported file type. Please select a PDF or Word document.', 'Close', { duration: 3000 });
    }
  } else {
    this.selectedFile = null;
  }
}


uploadFile(): void {
  if (this.selectedFile && this.ticketId) {
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('ticketId', this.ticketId.toString());

    this.ticketService.uploadFile(formData).subscribe(
      (response) => {
        this.snackBar.open('File uploaded successfully!', 'Close', { duration: 3000 });
        this.getTicketDetails(); // Refresh ticket details to show the new file
      },
      (error) => {
        console.error('Error uploading file:', error);
        this.snackBar.open('Error uploading file.', 'Close', { duration: 3000 });
      }
    );
  } else {
    console.error('File or ticket ID is missing.');
    this.snackBar.open('File or ticket ID is missing.', 'Close', { duration: 3000 });
  }
}

}


