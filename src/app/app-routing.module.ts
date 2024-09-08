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
import { TicketUserComponent } from './ticket-user/ticket-user.component';
import { TicketTreatementComponent } from './ticket-treatement/ticket-treatement.component';
import { LayoutComponent } from './layout/layout.component';
import { AboutComponent } from './about/about.component';
import { LogsComponent } from './logs/logs.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: 'ticketByUser', component: TicketUserComponent },
      { path: 'ticket-treatment/:ticketId', component: TicketTreatementComponent},
       {path: 'home', component: HomeComponent
       },
       {path: 'About', component: AboutComponent
       },
       {path: '', component: HomeComponent},

    ]
  }, 
  { path: 'affect-user/:ticketId', component: SetUserToTicketComponent },
  {path:'notification',component:NotificationComponent},
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
{path:'ticketByUser',component:TicketUserComponent},
{path:'ticket-treatment/:ticketId',component:TicketTreatementComponent},
{path:'',component:DashboardComponent},
{path:'logs/:ticketId',component:LogsComponent},
{path:'user',component:UserComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
