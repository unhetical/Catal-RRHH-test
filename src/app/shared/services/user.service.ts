import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../models/user.interface';
import { catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) { }

  /**
   * Get user with id 1
   * Reviewed with json-server --watch db.json
   * local file `assets/db.json`
   */
  getUser(): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/data?id=1`).pipe(
      catchError ((err) => throwError(err)),
      shareReplay(1)
    );
  }

  /**
   * Set updated data in user with id 1
   * @param user user
   */
  setUser(user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:3000/data?id=1`, user).pipe(
      catchError ((err) => throwError(err)),
      shareReplay(1)
    );
  }
}
