import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import {url} from "../urls";
import {ToastController} from "@ionic/angular";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private toastController:ToastController) { }

  getUser() : Observable<any>{
  return this.httpClient.get<any[]>(url+'api/user/').pipe(catchError(this.handleError));
  }

  postUser(data : any) : Observable<any>{
    return this.httpClient.post<any>(url+'api/sign-up/', data, {observe: 'response'});
        // .pipe(
        // catchError(this.handleError400)
        // );
  }

  checkAvailability(data:any) : Observable<any>{
    return this.httpClient.get<any>(url + 'api/check-availability/',data);
  }

  // async presentToast(msg) {
  //   const toast = await this.toastController.create({
  //     message: msg,
  //     duration: 2500
  //   });
  //   toast.present();
  // }
  // private handleError400(error: HttpErrorResponse){
  //   if (error.status == 400){
  //     this.presentToast('Username or email already exists.');
  //   }
  //   return throwError(
  //     '400.');
  // }

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
