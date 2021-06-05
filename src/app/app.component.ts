import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthState} from "./auth-state";
import {AuthService} from "./services/auth-service/auth.service";
import {ConnectionService} from './services/connection-service/connection.service'
import {ModalController, ToastController} from '@ionic/angular';
import {RequestsComponent} from "./components/requests/requests.component";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  authenticated : boolean;
  requests: any[];
  constructor(
    private router :Router,
    private authState: AuthState,
    private auth:AuthService,
    private connectionService: ConnectionService,
    public modalController: ModalController,
    public toastController: ToastController
    ) {}

  ngOnInit(): void {
    this.authState.getAuthstate().subscribe(x => this.authenticated = x);
    console.log('oninit running');
    if (this.authenticated == true){
    this.connectionService.getRequests()
      .subscribe( resp => {
        this.requests  = resp;
        console.log('requests:'+this.requests);
      });
    };
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500
    });
    toast.present();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: RequestsComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'requests' : this.requests,
      }
    });
    modal.onDidDismiss().then((data) => {
        console.log(data);
        this.connectionService.getRequests()
      .subscribe( resp => {
        this.requests  = resp;
        console.log('requests:'+this.requests);
      });
    });
    return await modal.present();
  }
  goToSearch(){
    this.router.navigateByUrl('/search');
  }
  logOut(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
  goToFeed() {
    this.router.navigateByUrl('/feed');
  }
  clicked() {
    console.log('clicked');
  }
  showRequests(){
    if(this.requests.length == 0){
      this.presentToast("You haven't recieved any requests as of now.");
    }
    else{
      this.presentModal();
    }
  }

}
