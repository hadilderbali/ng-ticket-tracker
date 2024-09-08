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
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { TicketUserComponent } from './ticket-user/ticket-user.component';
import { TicketTreatementComponent } from './ticket-treatement/ticket-treatement.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import { AboutComponent } from './about/about.component';
import { LogsComponent } from './logs/logs.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    AppComponent,
  AutocompleteComponent,
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
       TicketUserComponent,
       TicketTreatementComponent,
       HeaderComponent,
       FooterComponent,
       LayoutComponent,
       AboutComponent,
       LogsComponent,
       UserComponent,
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
   ReactiveFormsModule, 
   FormsModule,
   NgChartsModule,
   BrowserAnimationsModule,
   MatSnackBarModule,
   MatCardModule,
   MatButtonModule,
   MatFormFieldModule,
   MatInputModule,
   MatSelectModule,
   MatIconModule,

 
    
   
  ],

 
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
