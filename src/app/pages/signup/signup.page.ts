import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule , ReactiveFormsModule } from '@angular/forms';
import {UserService} from "../../services/user-service/user.service";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: FormGroup;
  constructor( private fb:FormBuilder, private userService : UserService, private router : Router, private toastController: ToastController) { }

  ngOnInit() {
    this.form = this.fb.group({
        first_name: ['',[Validators.required]],
        last_name:  ['',[Validators.required]],
        email:  ['',[Validators.required, Validators.email]],
        gender:  ['',[Validators.required]],
        username:  ['',[Validators.required]],
        password:  ['',[Validators.required]]
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2500
    });
    toast.present();
  }

  goToLogin(){
    this.router.navigateByUrl('/login');
  }
  showform(){
    console.log(this.form.value);
  }

  onSubmit() {
    //validating username as only numbers of length 10
    if (!this.form.value['username'].isNaN && this.form.value['username'].length == 10){
      this.userService.checkAvailability({'username':this.form.value['username'],'email':this.form.value['email']})
        .subscribe(x => {
          console.log(JSON.stringify(x));
          if (x?.available == true){
            this.userService.postUser(this.form.value)
              .subscribe(resp => {
                console.log('resp-'+resp.status);
                if (resp.status == '201'){
                  this.presentToast('Account created successfully.');
                  this.goToLogin();
                }
                // else if (resp.status == '500'){
                //   this.presentToast('Something went wrong(500).');
                //   // this.goToLogin();
                // }
                // else if (resp.status == '400'){
                //   this.presentToast('Username or email already exists');
                //   // this.goToLogin();
                // }
                // else{
                //   console.log(resp);
                //   this.presentToast('Either username already exists, or details not entered correctly.');
                // }
              });}
              else{
                this.presentToast('Username or email already exists');
          }
          }
        );

    }

  }
}
