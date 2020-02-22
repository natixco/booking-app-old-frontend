import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { TitleService } from '@services/title/title.service';
// import {btnHover} from '../../../../../assets/btn-hover';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoading: boolean;
  captchaResponse: string;
  registrationError: string;
  isLogin: boolean;

  constructor(
    private _AuthService: AuthService,
    private _TitleService: TitleService,
    private _Router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })

    this.isLogin = this._Router.url.includes('logged-out') ? false : true;
    this.isLogin ? this._TitleService.setTitle('TITLE.login') : this._TitleService.setTitle('TITLE.loggedout');
  }

  get form() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    console.log('💩 Login is still without captcha, don\'t delete the commented parts');
    // btnHover();
  }

  onSubmit(captchaRef: any) {
    if (this.captchaResponse) {
      captchaRef.reset();
    }
    captchaRef.execute();

    this.isLoading = true;
  }

  resolved(captchaResponse: string) {
    this.captchaResponse = captchaResponse;
    if (this.captchaResponse) {
      // this.onLogin(captchaResponse);
    }
  }

  // onLogin(token: string) {
  onLogin() {
    this.registrationError = '';

    // this.loginForm.value.captcha = token;
    this._AuthService.login(this.loginForm.value).subscribe(
      res => {
        if (res['status'] === 'failed') {
          this.isLoading = false;
        } else {
          this._Router.navigate(['/app/dashboard']);
        }
      },
      err => {
        if(err['error']['code'] === 'invalid_csrf') {
          this._AuthService.renewCSRF();
        }
        console.log(err)
        this.isLoading = false;
      });
  }

}
