import { CommentAbstractBase } from './comment-abstract-base.model';

export class Comment extends CommentAbstractBase {
  commentId: string;
  author: string;
  dateCreated: Date;
}
