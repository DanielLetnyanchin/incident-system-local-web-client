import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Comment } from './comment.model';
import { Observable } from 'rxjs';

@Injectable()
export class CommentService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getComments(incidentId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/incidents/${incidentId}/comments`);
  }
}
