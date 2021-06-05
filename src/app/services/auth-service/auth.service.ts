import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
// import { ServerService } from '../server/server.service';
import {ServerService} from '../server-service/server.service';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import {AuthState} from '../../auth-state';
import {url} from '../urls';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private returnUrl: any;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private server: ServerService,
      private httpClient: HttpClient,
      private authenticated: AuthState
      ) {

    console.log('Auth Service');
    const userData = localStorage.getItem('user');
    if (userData) {
      console.log('Logged in from memory');
      const user = JSON.parse(userData);
      this.token = user.token;
      this.authenticated.setAuthState(true);
      // this.server.setLoggedIn(true, this.token);
    }
  }

  isLoggedIn() {
    if (localStorage.getItem('user')) {
      console.log('got token -> ' + JSON.stringify(localStorage.getItem('user')));
      return true;
    } else {
      console.log('returning false');
      return false;
    }
  }

  // sendHello(){
  //   var status:boolean = true ;
  //   this.httpClient.get(`https://insteasy.herokuapp.com/hello/`, {observe: 'response'})
  //         .subscribe(response => {
  //           var status2 = (response.status === 200 || response.status == 200);
  //           console.log('status2-> ' + status2);
  //           status = status2;
  //         });
  //   return status;
  // }

  getToken(){
    return this.token;
  }

  getUser(){
    // let token = this.getToken();
    return jwt_decode(this.getToken());
  }

  login(user) {
    if (user.username !== '' && user.password !== '' ) {
      return this.server.request('POST', 'api/token/', {
        username: user.username,
        password: user.password
      }).subscribe((response: any) => {
        console.log('response.token:' + response.access);
        console.log('response.auth:' + response.auth);
        if (response.access !== undefined) {

          this.token = response.access;
          this.server.setLoggedIn(true, this.token);
          this.authenticated.setAuthState(true);
          const userData = {
            token: this.token,
          };
          localStorage.setItem('user', JSON.stringify(userData));
          console.log('logged in as'+this.token);
          // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
          // console.log('return url-> '+ this.returnUrl);
          // this.router.navigate([this.returnUrl]).then(() => {
          //   window.location.reload();
          //   console.log('reloaded.');
          // });
          this.router.navigate(['']).then(() => {
            // window.location.reload();
            console.log('reloaded.');
          });
        }
      });
    }
  }

  logout() {
    localStorage.clear();
    this.authenticated.setAuthState(false);
    console.log('logged out');
    this.router.navigate(['/login']).then(() => {
            // window.location.reload();
            console.log('reloaded.');
          });
  }
}
