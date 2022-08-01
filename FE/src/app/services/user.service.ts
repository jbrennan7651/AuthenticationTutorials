import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = "http://localhost:8080/api/test"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(baseURL + '/all', {responseType: 'text'});
  }
  getUserBoard() : Observable<any>{
    return this.http.get(baseURL + '/user', {responseType: 'text'}); 
  }
  getModBoard() : Observable<any>{
    return this.http.get(baseURL + '/mod', {responseType: 'text'}); 
  }
  getAdminBoard() : Observable<any>{
    return this.http.get(baseURL + '/admin', {responseType: 'text'}); 
  }
}
