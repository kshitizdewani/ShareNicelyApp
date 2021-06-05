import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user-service/user.service";
import {url} from "../../services/urls";
import {FeedService} from "../../services/feed-posts-service/feed.service";
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  content : string;
  scope : string;
  userdata : any[];
  profile_pic : string;
  posts: any[];
  public url = url.slice(0,-1);
  constructor(private user:UserService,
              private feedService: FeedService,
              public toastController: ToastController,
              private router: Router,
              ) { }

  ngOnInit() {
    this.user.getUser().subscribe(x => {
      this.userdata = x;
      this.profile_pic = url+this.userdata['profile_picture'].slice(1);
      console.log(JSON.stringify(this.userdata));
    });

    this.feedService.getFeed().subscribe(x => {
      this.posts = x;
      console.log(JSON.stringify(this.posts));
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500
    });
    toast.present();
  }


  createPost(){
    if (this.content == undefined || this.content == '' || this.scope == undefined || this.scope == ''){
      this.presentToast('Please write something, and also choose visibility.');
    }
    else{
      console.log(this.scope+this.content);
      this.feedService.postNewFeed({content: this.content,visibility: this.scope})
        .subscribe( resp => {
          if (resp.status == '201'){
                this.feedService.getFeed().subscribe(x => {
                  this.posts = x;
                  console.log(JSON.stringify(this.posts));
                });
              this.presentToast('Post created.');
          }
        });
    }

  }

  goToProfile(username){
    console.log(username);
    this.router.navigateByUrl('/profile/'+username);
  }

}
