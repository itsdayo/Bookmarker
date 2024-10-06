import { Injectable } from '@angular/core';
import { User } from '../models/user.model.client';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared.service.client';
// injecting service into module
@Injectable()
export class UserService {
  baseUrl = environment.baseUrl;

  options = {
    withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private sharedService: SharedService,
    private router: Router
  ) {}

  loggedIn() {
    this.options.withCredentials = true;
    return this.http
      .post(this.baseUrl + '/api/loggedIn', '', this.options)
      .pipe(
        map((res) => {
          const user = res;
          if (user !== 0) {
            this.sharedService.user = user; // setting user so as to share with all components
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
  }

  login(username: String, password: String) {
    this.options.withCredentials = true;
    const body = {
      username: username,
      password: password,
    };

    return this.http
      .post<User>(this.baseUrl + '/api/login', body, this.options)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  register(username: String, password: String) {
    const user = {
      username: username,
      password: password,
    };
    return this.http
      .post<User>(this.baseUrl + '/api/register', user, this.options)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  createUser(user: User) {
    const url = this.baseUrl + '/api/user';
    return this.http.post(url, user).pipe(
      map((response) => {
        return response;
      })
    );
  }

  findUserById(userId: string) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.get(url).pipe(
      map((response) => {
        return response;
      })
    );
  }

  findUserByUsername(username: string) {
    const url = this.baseUrl + '/api/user?username=' + username;
    return this.http.get<User>(url).pipe(
      map((response) => {
        return response;
      })
    );
  }
  findUserByCredentials(username: string, password: string) {
    const url =
      this.baseUrl + '/api/user?username=' + username + '&password=' + password;
    return this.http.get(url).pipe(
      map((response) => {
        return response;
      })
    );
  }

  updateUser(userId: string, user: User) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.put<User>(url, user).pipe(
      map((response) => {
        return response;
      })
    );
  }

  deleteUser(userId: string) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.delete(url).pipe(
      map((response) => {
        return response;
      })
    );
  }

  logout() {
    // this.options.withCredentials = true;
    return this.http.post(this.baseUrl + '/api/logout', '', this.options).pipe(
      map((res) => {
        this.sharedService.user = null;
        return res;
      })
    );
  }
}
