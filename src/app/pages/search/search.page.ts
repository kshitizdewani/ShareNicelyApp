import { Component, OnInit } from '@angular/core';
import {SearchingService} from '../../services/searching-service/searching.service';
import {url} from '../../services/urls';
import {Router} from "@angular/router";
import { AlertController, ToastController } from '@ionic/angular';
import {ConnectionService} from "../../services/connection-service/connection.service";


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  results: any[];
  url = url.slice(0,-1);
  term : string;
  constructor(private searchService: SearchingService,
              private router: Router,
              public alertController: AlertController,
              private connectionService: ConnectionService,
              private toastController: ToastController,) { }

  ngOnInit() {
    console.log('search page');
  }

  goToFeed(){
    this.router.navigateByUrl('')
  }

  searched(event){
    var term = event.target.value;
    this.term = term;
    console.log(term);
    if (term && term.trim !=''){
    this.searchService.search(term).subscribe(result => {
      this.results = result;
    });
    }
  }

    goToProfile(username){
    console.log(username);
    this.router.navigateByUrl('/profile/'+username);
  }

  async showCancellationAlert(name,username) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cancel request?',
      message: 'Do you really want to cancel the connection request sent to '+'<strong>'+name+'</strong> ?',
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
                this.searchService.search(this.term).subscribe(result => {
                  this.results = result;
                });
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
          this.searchService.search(this.term).subscribe(result => {
            this.results = result;
            console.log(JSON.stringify(this.results));
          });
         this.presentToast('Request sent');
        }
      });
  }

}
