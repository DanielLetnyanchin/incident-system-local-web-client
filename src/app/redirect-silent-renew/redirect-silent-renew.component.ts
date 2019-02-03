import { OpenIdConnectService } from '../shared/open-id-connect.service';
import { OnInit, Component } from '@angular/core';


@Component({
  selector: 'incident-system-redirect-silent-renew',
  templateUrl: './redirect-silent-renew.component.html',
  styleUrls: ['./redirect-silent-renew.component.css']
})

export class RedirectSilentRenewComponent implements OnInit {

  constructor(private openIdConnectService: OpenIdConnectService) { }

  ngOnInit() {
    this.openIdConnectService.handleSilentCallback();
  }
}
