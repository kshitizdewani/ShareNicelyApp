import {Component, Input, OnInit} from '@angular/core';
import {ConnectionService} from "../../services/connection-service/connection.service";
import { ToastController, ModalController } from '@ionic/angular';
import {url} from "../../services/urls";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {
  @Input() requests : any[];
  url = url.slice(0,-1);
  constructor(private connectionService: ConnectionService, private toastController : ToastController, private modalController: ModalController) { }

  ngOnInit() {

  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  accept(username){
    this.connectionService.actionToRequest({ 'connection' :username, 'action' : 'accept'})
      .subscribe(resp => {
        console.log(resp.status);
        if (resp.status == '200'){
          this.connectionService.getRequests()
            .subscribe(x => {
              this.requests = x;
            });
          this.presentToast('Request accepted.');
        }
      });
  }

  reject(username){
    this.connectionService.actionToRequest({ 'connection' :username, 'action' : 'reject'})
      .subscribe(resp => {
        console.log(resp.status);
        if (resp.status == '200'){
          this.connectionService.getRequests()
            .subscribe(x => {
              this.requests = x;
            });
          this.presentToast('Request rejected');
        }
      });
  }
}
