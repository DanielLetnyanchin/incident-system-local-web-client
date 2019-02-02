import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommentService } from '../shared/comment.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'incident-system-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})

export class CommentAddComponent implements OnInit {
  private sub: Subscription;
  private incidentId: string;
  public commentForm: FormGroup;

  constructor(private commentService: CommentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      message: ['']
    });

    // get route data (incidentId)
    this.sub = this.route.params.subscribe(
      params => {
        this.incidentId = params['incidentId'];
      }
    );
  }

  addComment(): void {
  if (this.commentForm.dirty) {
    // tslint:disable-next-line:prefer-const
    let comment = automapper.map(
      'CommentFormModel',
      'CommentForCreation',
      this.commentForm.value);
      // comment.message = this.commentForm.value.message;
    this.commentService.addComment(this.incidentId, comment)
      .subscribe(
        () => {
          this.router.navigateByUrl('/incidents');
        });
  }
}

// tslint:disable-next-line:use-life-cycle-interface
ngOnDestroy(): void {
  this.sub.unsubscribe();
}


}
