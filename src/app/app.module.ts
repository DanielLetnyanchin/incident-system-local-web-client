import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http/src/client';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { AboutComponent } from './about';
import {
  IncidentsComponent, IncidentAddComponent, IncidentDetailComponent,
  IncidentUpdateComponent
 } from './incidents';
 import { CommentsComponent, CommentAddComponent, CommentUpdateComponent } from './incidents/comments';
import { MasterDataService } from './shared/master-data.service';
 import { IncidentService } from './incidents/shared/incident.service';
 import { CommentService } from './incidents/comments/shared/comment.service';
import { GlobalErrorHandler } from './shared/global-error-handler';
import { ErrorLoggerService } from './shared/error-logger.service';
import { HandleHttpErrorInterceptor } from './shared/handle-http-error-interceptor';
import { WriteOutJsonInterceptor } from './shared/write-out-json-interceptor';
import { EnsureAcceptHeaderInterceptor } from './shared/ensure-accept-header-interceptor';
import { OpenIdConnectService } from './shared/open-id-connect.service';
import { SigninOidcComponent } from './signin-oidc/signin-oidc.component';
import { RequireAuthenticatedUserRouteGuardService } from './shared/require-authenticated-user-route-guard.service';
import { AddAuthorizationHeaderInterceptor } from './shared/add-authorization-header-interceptor';
import { RedirectSilentRenewComponent } from './redirect-silent-renew/redirect-silent-renew.component';
@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    IncidentsComponent,
    IncidentDetailComponent,
    IncidentAddComponent,
    IncidentUpdateComponent,
    CommentsComponent,
    CommentAddComponent,
    CommentUpdateComponent,
    SigninOidcComponent,
    RedirectSilentRenewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddAuthorizationHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: EnsureAcceptHeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WriteOutJsonInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleHttpErrorInterceptor,
      multi: true,
    },
    GlobalErrorHandler, ErrorLoggerService, IncidentService,
    DatePipe, CommentService, MasterDataService, OpenIdConnectService,
    RequireAuthenticatedUserRouteGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    // automapper mappings

    automapper.createMap('IncidentFormModel', 'IncidentForCreation')
    .forSourceMember('priority', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => { opts.ignore(); })
    .forSourceMember('assignedTo', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => { opts.ignore(); });

    automapper.createMap('IncidentFormModel', 'IncidentWithStatusPriorityAndAssignedToForCreation')
    .forSourceMember('assignedTo', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => { opts.ignore(); })
    .forMember('assignedToProfileId', function (opts) { opts.mapFrom('assignedTo'); });

    automapper.createMap('CommentFormModel', 'CommentForCreation')
    .forMember('message', function (opts) { opts.mapFrom('message'); });

    automapper.createMap('IncidentFormModel', 'IncidentForUpdate')
    .forSourceMember('assignedTo', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => { opts.ignore(); })
    .forMember('assignedToProfileId', function (opts) { opts.mapFrom('assignedTo'); });

    automapper.createMap('CommentFormModel', 'CommentForUpdate')
    .forMember('message', function (opts) { opts.mapFrom('message'); });
  }
}
