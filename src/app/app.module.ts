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
 import { CommentsComponent, CommentAddComponent } from './incidents/comments';
import { MasterDataService } from './shared/master-data.service';
 import { IncidentService } from './incidents/shared/incident.service';
 import { CommentService } from './incidents/comments/shared/comment.service';
import { GlobalErrorHandler } from './shared/global-error-handler';
import { ErrorLoggerService } from './shared/error-logger.service';
import { HandleHttpErrorInterceptor } from './shared/handle-http-error-interceptor';
import { WriteOutJsonInterceptor } from './shared/write-out-json-interceptor';
import { IncidentForCreation } from './incidents/shared/incident-for-creation.model';
import { EnsureAcceptHeaderInterceptor } from './shared/ensure-accept-header-interceptor';
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
    GlobalErrorHandler, ErrorLoggerService, IncidentService, DatePipe, CommentService, MasterDataService],
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
  }
}
