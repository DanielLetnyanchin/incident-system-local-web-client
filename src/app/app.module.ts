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
import { GlobalErrorHandler } from './shared/global-error-handler';
import { ErrorLoggerService } from './shared/error-logger.service';
import { HandleHttpErrorInterceptor } from './shared/handle-http-error-interceptor';
import { WriteOutJsonInterceptor } from './shared/write-out-json-interceptor';
import { IncidentService } from './incidents/shared/incident.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    IncidentsComponent,
    IncidentDetailComponent,
    IncidentAddComponent,
    IncidentUpdateComponent,
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
      useClass: WriteOutJsonInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HandleHttpErrorInterceptor,
      multi: true,
    },
    GlobalErrorHandler, ErrorLoggerService, IncidentService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
