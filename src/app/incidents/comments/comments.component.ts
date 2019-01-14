import { Component, OnInit, Input } from '@angular/core';
import { Comment } from './shared/comment.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from './shared/comment.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'incident-system-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})

export class CommentsComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  private incidentId: number;
  comments: Comment[];

  constructor(private commentService: CommentService,
     private route: ActivatedRoute) { }

 ngOnInit() {
      // get route data (incidentId)
      this.sub = this.route.params.subscribe(
        params => {
          this.incidentId = params['incidentId'];

          // load incident
          this.commentService.getComments(this.incidentId)
            .subscribe(comments => {
              this.comments = comments;
            });
        }
      );
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
}
