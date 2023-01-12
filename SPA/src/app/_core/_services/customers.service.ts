import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  baseUrl = environment.apiUrl + "customers/";

  constructor(private http: HttpClient) { }

  getAllCustomer() {
    return this.http.get<string[]>(`${this.baseUrl}`);
  }

}
