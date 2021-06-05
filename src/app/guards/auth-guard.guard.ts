import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthState} from "../auth-state";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  private authenticated: boolean;

  constructor(
    private router: Router,
    private auth: AuthState
  ) {
    this.auth.getAuthstate().subscribe(x => this.authenticated = x);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.auth.getAuthstate().subscribe(x => this.authenticated = x);
    console.log('auth state in guard:'+this.authenticated);
    if (this.authenticated == true || this.authenticated !== false) {
            // this.router.navigate([state.url]);
            return true;
        }
        // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}
