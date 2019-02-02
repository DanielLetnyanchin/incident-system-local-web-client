import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about';
import { AppComponent } from './app.component';
import { IncidentsComponent, IncidentDetailComponent, IncidentUpdateComponent, IncidentAddComponent } from './incidents';
import { CommentAddComponent, CommentUpdateComponent, CommentsComponent } from './incidents/comments/index';

const routes: Routes = [
  // redirect root to the dasbhoard route
  { path: '', redirectTo: 'incidents', pathMatch: 'full' },
  { path: 'incidents', component: IncidentsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'incidents/:incidentId', component: IncidentDetailComponent },
  { path: 'incident-update/:incidentId', component: IncidentUpdateComponent },
  { path: 'incident-add', component: IncidentAddComponent },
  { path: 'incidents/:incidentId/comment-add', component: CommentAddComponent },
  { path: 'incidents/:incidentId/comments', component: CommentsComponent },
  { path: 'incidents/:incidentId/comment-update/:commentId', component: CommentUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // onSameUrlNavigation: 'ignore',
    onSameUrlNavigation: 'reload'
  }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
