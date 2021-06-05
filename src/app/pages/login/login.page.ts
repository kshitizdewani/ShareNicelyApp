import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule , ReactiveFormsModule } from '@angular/forms';
import {SignupPage} from "../../pages/signup/signup.page";
import {AuthService} from "../../services/auth-service/auth.service";
import {AuthState} from "../../auth-state";
import {Router} from "@angular/router";
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  formSubmitAttempt: boolean;
  loginInvalid: boolean;
  authenticated: boolean;
  constructor(private fb: FormBuilder,
              private _authService: AuthService,
              private authState: AuthState,
              private router: Router,
              public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.authState.getAuthstate().subscribe(state => {
      this.authenticated = state;
      if (this.authenticated == true){
      this.router.navigateByUrl('');
    }
    });

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  goToSignup(){
    this.router.navigateByUrl('/sign-up');
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Authenticating, Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  async onSubmit() {

    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid){
      try{
        console.log(this.form.value);
        await this._authService.login(this.form.value);
        this.presentLoading();
      } catch (e) {
        this.loginInvalid = true;
        console.log('login failed');
        console.log(e);
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
}
