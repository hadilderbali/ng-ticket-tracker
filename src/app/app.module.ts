import { NgModule } from '@angular/core';
import{HttpClientModule} from "@angular/common/http";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NotificationComponent } from './notification/notification.component';
import { HomeComponent } from './home/home.component';
import { TicketComponent } from './ticket/ticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NgChartsModule } from 'ng2-charts';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SetTeamComponent } from './set-team/set-team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { SetUserToTicketComponent } from './set-user-to-ticket/set-user-to-ticket.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { AffectUserToTicketComponent } from './affect-user-to-ticket/affect-user-to-ticket.component';

@NgModule({
  declarations: [
    AppComponent,
 
    NotFoundComponent,
       NotificationComponent,
       HomeComponent,
       TicketComponent,
       DashboardComponent,
       NavbarComponent,
       SidebarComponent,
       NotificationListComponent,
       TicketListComponent,
       CreateProjectComponent,
       ProjectListComponent,
       SetTeamComponent,
       TeamListComponent,
       SetUserToTicketComponent,
       TeamDetailsComponent,
       CreateTeamComponent,
       AffectUserToTicketComponent,
   
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
   ReactiveFormsModule, 
   FormsModule,
   NgChartsModule
   
    // Add other modules here if needed
 
    
   
  ],

 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
