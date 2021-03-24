import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class UserService {
  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(email, password) {
    if (!email) {
      return throwError("[user.service]: not email provided");
    }
    if (!password) {
      return throwError("[user.service]: not password provided");
    }

    return this.http.post(`${this.baseUrl}/auth`, { email, password });
  }

  singup(email, password) {
    if (!email) {
      return throwError("[user.service]: not email provided");
    }
    if (!password) {
      return throwError("[user.service]: not password provided");
    }

    return this.http.post(`${this.baseUrl}/users`, { email, password });
  }

  pswRecoveryRequest(email) {
    if (!email) {
      return throwError("[user.service]: not email provided");
    }

    return this.http.post(`${this.baseUrl}/users/forgot_password`, { email });
  }

  pswUpdateRequest(code, password) {
    if (!code) {
      return throwError("[user.service]: not code provided");
    }
    if (!password) {
      return throwError("[user.service]: not password provided");
    }

    return this.http.post(`${this.baseUrl}/users/forgot_password`, { code, password });
  }
}
