import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { TitleService } from '@services/title/title.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {

  passwordForm: FormGroup;
  isLoading: boolean;
  captchaResponse: string;
  registrationError: string;

  constructor(
    private _AuthService: AuthService,
    private _TitleService: TitleService,
    private _Router: Router
  ) {
    this.passwordForm = new FormGroup({
      email: new FormControl('',Validators.required),
    })

    this._TitleService.setTitle('TITLE.forgotpw');
  }

  get form() {
    return this.passwordForm.controls;
  }

  ngOnInit() {
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
      this.onPwChange(captchaResponse);
    }
  }

  onPwChange(token: string) {
    this.registrationError = '';

    this.passwordForm.value.captcha = token;
    // this._AuthService.forgotPassword(this.passwordForm.value).subscribe(
    //   res => {
    //     console.log(res);
    //     if (res['status'] === 'failed') {
    //       this.isLoading = false;
    //     } else {
    //       this._Router.navigate(['/app/dashboard']);
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //     this.isLoading = false;
    //   });
  }

}
