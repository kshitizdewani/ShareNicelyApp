import { BehaviorSubject } from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthState{
    private loggedIn = new BehaviorSubject<boolean>(false);

    public setAuthState(to: boolean){
        this.loggedIn.next(to);
        console.log('set authentication state to ' + to);
    }

    public getAuthstate(){
        return this.loggedIn.asObservable();
    }

}
