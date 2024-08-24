import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { NotificationComponent } from './notification/notification.component';
import { HomeComponent } from './home/home.component';
import { TicketComponent } from './ticket/ticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SetTeamComponent } from './set-team/set-team.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { CreateTeamComponent } from './create-team/create-team.component';
import { SetUserToTicketComponent } from './set-user-to-ticket/set-user-to-ticket.component';


const routes: Routes = [
 
  { path: 'affect-user/:ticketId', component: SetUserToTicketComponent },
  {path:'notification',component:NotificationComponent},
  {path:'',component:DashboardComponent},
  {path:'createTicket',component:TicketComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'notificationList',component:NotificationListComponent},
  {path:'ticketList',component:TicketListComponent},
  {path:'createProject',component:CreateProjectComponent},
  {path:'projectList',component:ProjectListComponent},
  { path: 'set-team/:projectId', component: SetTeamComponent },
  { path: 'teams', component: TeamListComponent },
{ path: 'team-details/:teamId',component:TeamDetailsComponent},
{path:'createTeam',component:CreateTeamComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
