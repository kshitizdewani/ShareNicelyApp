import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, observeOn} from "rxjs/operators";
import {url} from "../urls";


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  getProfile(username) : Observable<any>{
    return this.httpClient.get<any[]>(url+'api/profile/'+username).pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        window.alert("Client error");
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        window.alert("Backend returned an unsuccessful response code.");
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
      }
      // Return an observable with a user-facing error message.
      return throwError(
        'Something bad happened; please try again later.');
    }

}
