import { Component } from '@angular/core';
import 'automapper-ts';
import { OpenIdConnectService } from './shared/open-id-connect.service';
@Component({
  selector: 'incident-system-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-app';

  constructor(public openIdConnectService: OpenIdConnectService) {
  }
}
