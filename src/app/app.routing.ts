import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about';
import { AppComponent } from './app.component';
import { IncidentsComponent, IncidentDetailComponent, IncidentUpdateComponent, IncidentAddComponent } from './incidents';
import { CommentAddComponent, CommentUpdateComponent, CommentsComponent } from './incidents/comments/index';
import { SigninOidcComponent } from './signin-oidc/signin-oidc.component';
import { RequireAuthenticatedUserRouteGuardService } from './shared/require-authenticated-user-route-guard.service';
import { RedirectSilentRenewComponent } from './redirect-silent-renew/redirect-silent-renew.component';

const routes: Routes = [
  // redirect root to the dasbhoard route
  { path: '', redirectTo: 'incidents', pathMatch: 'full',
  canActivate: [RequireAuthenticatedUserRouteGuardService] },
  { path: 'incidents', component: IncidentsComponent,
  canActivate: [RequireAuthenticatedUserRouteGuardService] },
  { path: 'about', component: AboutComponent },
  { path: 'incidents/:incidentId', component: IncidentDetailComponent,
  canActivate: [RequireAuthenticatedUserRouteGuardService] },
  { path: 'incident-update/:incidentId', component: IncidentUpdateComponent,
  canActivate: [RequireAuthenticatedUserRouteGuardService] },
  { path: 'incident-add', component: IncidentAddComponent,
  canActivate: [RequireAuthenticatedUserRouteGuardService] },
  { path: 'incidents/:incidentId/comment-add', component: CommentAddComponent,
  canActivate: [RequireAuthenticatedUserRouteGuardService] },
  { path: 'incidents/:incidentId/comments', component: CommentsComponent,
  canActivate: [RequireAuthenticatedUserRouteGuardService] },
  { path: 'incidents/:incidentId/comment-update/:commentId', component: CommentUpdateComponent,
  canActivate: [RequireAuthenticatedUserRouteGuardService] },
  { path: 'signin-oidc', component: SigninOidcComponent },
  { path: 'redirect-silentrenew', component: RedirectSilentRenewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // onSameUrlNavigation: 'ignore',
    // onSameUrlNavigation: 'reload'
  }) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
