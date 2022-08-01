import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseURL = "http://localhost:8080/api/auth"
const httpOptions = {
  headers : new HttpHeaders(
    {"No-Auth": "True"}
  )
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string) : Observable<any>{
    return this.http.post(
      baseURL + '/signin', 
      {
        username, password
      },
      httpOptions
    );
  }

  register(username : string, email: string, password: string): Observable<any> {
    return this.http.post(
      baseURL + '/signup', 
      {
        username, password, email
      },
      httpOptions
    );
  }
  logout(): Observable<any>{
    return this.http.post(baseURL + '/signout', {}, httpOptions);
  }
}
