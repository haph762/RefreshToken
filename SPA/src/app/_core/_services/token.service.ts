import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticatedResponse } from '../_models/authenticated-response.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  baseUrl = environment.apiUrl + "token/";
  constructor(private http: HttpClient) { }

  refreshToken(credentials: string) {
    return this.http.post<AuthenticatedResponse>(`${this.baseUrl}refresh`, credentials, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
  revoke() {
    return this.http.post<any>(`${this.baseUrl}revoke`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    });
  }
}
