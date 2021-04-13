import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../models/app.state';
import { UserModel } from '../models/user.model';
import { UserReturn } from '../models/user.return.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _baseUrl: string = "https://reqres.in";
  currentPage: number = 1;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.store.select(state => state.users.page).subscribe(page => {
      this.currentPage = page;
    });
  }

  getUsers(): Observable<UserReturn> {
    return this.http.get<UserReturn>(`${this._baseUrl}/api/users?page=${this.currentPage}`);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this._baseUrl}/api/users/${id}`);
  }

  addUser(user: UserModel) {
    return this.http.post(`${this._baseUrl}/api/users`, { name: `${user.first_name} ${user.last_name}`, job: 'Boss' });
  }

  getUser(id: number): Observable<UserReturn> {
    return this.http.get<UserReturn>(`${this._baseUrl}/api/users/${id}`);
  }

  updateUser(user: UserModel) {
    return this.http.put(`${this._baseUrl}/api/users/${user.id}`, { ...user });
  }
}
