import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Comment } from './comment.model';
import { Observable } from 'rxjs';
import { CommentForCreation } from './comment-for-creation.model';

@Injectable()
export class CommentService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getComments(incidentId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/incidents/${incidentId}/comments`);
  }

  addComment(incidentId: string, commentToAdd: CommentForCreation): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/incidents/${incidentId}/comments`, commentToAdd,
        { headers: { 'Content-Type': 'application/json' } });
  }
}
