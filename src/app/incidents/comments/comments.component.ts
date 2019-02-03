import { Component, OnInit, Input } from '@angular/core';
import { Comment } from './shared/comment.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from './shared/comment.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { OpenIdConnectService } from 'src/app/shared/open-id-connect.service';

@Component({
  selector: 'incident-system-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit {
  constructor(private route: ActivatedRoute,
    private openIdConnectService: OpenIdConnectService) { }

  // tslint:disable-next-line:no-inferrable-types
  private isManager: boolean =
    (this.openIdConnectService.user.profile.role === 'Manager');
  private incidentId: string;
  private sub: Subscription;

  @Input() comments: Comment[];

 ngOnInit() {
  this.sub = this.route.params.subscribe(
    params => {
      this.incidentId = params['incidentId'];
    }
  );
}
}
