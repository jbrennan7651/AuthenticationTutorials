import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:9090"

  requestHeader = new HttpHeaders(
    {"No-Auth" : "True"}
  )
  constructor(private httpClient : HttpClient) { }

  public login(loginData : any){
    return this.httpClient.post(this.baseUrl + "/authenticate", loginData, { headers : this.requestHeader})
  }
}
