import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import jwt_decode from "jwt-decode";
import {url} from "../urls";
import {AuthState} from "../../auth-state";

@Injectable({
  providedIn: 'root'
})
export class ServerService {
private loggedIn = false;

  private token: string;
  constructor(private http: HttpClient,public authentication : AuthState) { }

  setLoggedIn(loggedIn: boolean, token?: string) {
    this.authentication.setAuthState(loggedIn);
    this.loggedIn = loggedIn;
    this.token = token;
    var decoded = jwt_decode(this.token);
    console.log('setLoggedIn ' + JSON.stringify(decoded));
  }

  request(method: string, route: string, data?: any) {
    if (method === 'GET') {
      return this.get(route, data);
    }
    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;
    return this.http.request(method, url + route, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: header
    });
  }

  get(route: string, data?: any) {
    const header = (this.loggedIn) ? { Authorization: `Bearer ${this.token}` } : undefined;
    let params = new HttpParams();
    if (data !== undefined) {
      Object.getOwnPropertyNames(data).forEach(key => {
        params = params.set(key, data[key]);
      });
    }

    return this.http.get(url + route, {
      responseType: 'json',
      headers: header,
      params
    });

  }

}
