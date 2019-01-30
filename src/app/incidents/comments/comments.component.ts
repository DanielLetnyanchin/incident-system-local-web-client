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

export class CommentsComponent implements OnInit{

  @Input() comments: Comment[];

 ngOnInit() {
  }
}
