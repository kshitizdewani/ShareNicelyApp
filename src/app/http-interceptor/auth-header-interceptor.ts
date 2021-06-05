import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {

        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.token) {
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${user.token}`
                }
              });
            }
            return next.handle(request);
    }
}
