import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Comment } from './comment.model';
import { Observable } from 'rxjs';
import { CommentForCreation } from './comment-for-creation.model';
import { Operation } from 'fast-json-patch';

@Injectable()
export class CommentService extends BaseService {

  getComment(incidentId: string, commentId: string): any {
    return this.http.get<Comment>(`${this.apiUrl}/incidents/${incidentId}/comments/${commentId}`,
    { headers: { 'Accept': 'application/vnd.conceptual-inc.comment+json' } });
  }

  partiallyUpdateComment(incidentId: string, commentId: string, patchDocument: Operation[]): any {
    return this.http.patch(`${this.apiUrl}/incidents/${incidentId}/comments/${commentId}`, patchDocument,
    { headers: { 'Content-Type': 'application/vnd.conceptual-inc.comment-json-patch-document+json' } });
  }

  constructor(private http: HttpClient) {
    super();
  }

  getComments(incidentId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/incidents/${incidentId}/comments`);
  }

  addComment(incidentId: string, commentToAdd: CommentForCreation): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/incidents/${incidentId}/comments`, commentToAdd,
        { headers: { 'Content-Type': 'application/vnd.conceptual-inc.commentforcreation+json' } });
  }
}
