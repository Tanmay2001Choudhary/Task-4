import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users/search';
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {}

  getUsers(): void {
    this.http.get<User[]>(`${this.apiUrl}?username=`).subscribe((users) => {
      this.usersSubject.next(users);
    });
  }

  searchUsers(username: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}`);
  }
}
