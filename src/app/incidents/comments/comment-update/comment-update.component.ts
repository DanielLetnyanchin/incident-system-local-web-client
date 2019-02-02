import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { compare } from 'fast-json-patch';
import { CommentForUpdate } from '../shared/comment-for-update.model';
import { CommentService } from '../shared/comment.service';
import { CommentAbstractBase } from '../shared/comment-abstract-base.model';
import { Comment } from '../shared/comment.model';

@Component({
  selector: 'incident-system-comment-update',
  templateUrl: './comment-update.component.html',
  styleUrls: ['./comment-update.component.css']
})
export class CommentUpdateComponent implements OnInit, OnDestroy {

  public commentForm: FormGroup;
  private commentId: string;
  private incidentId: string;
  private sub: Subscription;
  private comment: Comment;
  private originalCommentForUpdate: CommentForUpdate;
  // tslint:disable-next-line:no-inferrable-types
  private isAdmin: boolean = true;

  constructor(private commentService: CommentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      message: ['']
    });

    if (this.isAdmin === true) {
      this.sub = this.route.params.subscribe(
        params => {
          this.incidentId = params['incidentId'],
          this.commentId = params['commentId'];

          this.commentService.getComment(this.incidentId, this.commentId)
            .subscribe(comment => {
              this.comment = comment;
              this.updateCommentForm();

              this.originalCommentForUpdate = automapper.map(
                'CommentFormModel',
                'CommentForUpdate',
                this.commentForm.value);
            });
          }
        );
      }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private updateCommentForm(): void {
    this.commentForm.patchValue({
      message: this.comment.message
    });
  }

  saveComment(): void {
    if (this.commentForm.dirty) {
      // TODO

      // tslint:disable-next-line:prefer-const
      let changedCommentForUpdate = automapper.map(
        'CommentFormModel',
        'CommentForUpdate',
        this.commentForm.value);

      // tslint:disable-next-line:prefer-const
      let patchDocument = compare(this.originalCommentForUpdate, changedCommentForUpdate);

      this.commentService.partiallyUpdateComment(this.incidentId, this.commentId, patchDocument)
        .subscribe(
          () => {
            this.router.navigateByUrl('/incidents/' + this.incidentId);
          });
    }
}
}
