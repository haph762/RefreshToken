import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticatedResponse } from '../_models/authenticated-response.model';
import { LoginModel } from '../_models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + "auth/";
  constructor(private http: HttpClient) { }

  login(model: LoginModel) {
    return this.http.post<AuthenticatedResponse>(`${this.baseUrl}login`, model, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
