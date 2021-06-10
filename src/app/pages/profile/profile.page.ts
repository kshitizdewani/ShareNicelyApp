import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from '../../services/profile-service/profile.service';
import  {url} from '../../services/urls';
import { AlertController, ToastController } from '@ionic/angular';
import {ConnectionService} from "../../services/connection-service/connection.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile: any[];
  url = url.slice(0,-1);
  mine : boolean;
  constructor(private route: ActivatedRoute,
              private profileService: ProfileService,
              private router:Router,
              public alertController: AlertController,
              private connectionService: ConnectionService,
              private toastController: ToastController,
              ) {
     this.fetchProfile();
   }

  ngOnInit() {
  }
  fetchProfile(){
    this.route.params.subscribe( params => {
       console.log(params);
       var username = params['id'];
       this.profileService.getProfile(username)
       .subscribe(resp => {
         this.profile = resp;
         this.mine = this.profile['mine'];
          console.log(JSON.stringify(this.profile));
       });
     });
  }

  goToProfile(username){
    console.log(username);
    this.router.navigateByUrl('/profile/'+username);
  }
  async showCancellationAlert(name,username) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cancel request?',
      message: 'Do you really want to cancel the connection request sent to '+'<strong>'+'name'+'</strong> ?',
      buttons: [
        {
          text: 'Yes, cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log(username);
            this.connectionService.actionToRequest({'connection':username,'action':'cancel'})
              .subscribe(resp => {
                if (resp.status == '200'){
                //  fetching complete profile again
                  this.fetchProfile();
                  this.presentToast('Connection request cencelled.');
                }
              });
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: "Don't cancel",
          handler: () => {
            console.log("don't cancel");
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500
    });
    toast.present();
  }

  sendRequest(username: string) {
    this.connectionService.actionToRequest({'connection':username, 'action':'request'})
      .subscribe(resp => {
        if (resp.status == '200'){
         this.fetchProfile();
         this.presentToast('Request sent');
        }
      });
  }
}
