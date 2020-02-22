import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { TitleService } from '@services/title/title.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  isLoading: boolean;
  captchaResponse: string;
  registrationError: string;

  constructor(
    private _AuthService: AuthService,
    private _TitleService: TitleService,
    private _Router: Router
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(120)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(65)]),
      password: new FormControl('', [Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{6,100})/), Validators.maxLength(100)])
    });

    this._TitleService.setTitle('TITLE.signup');
  }

  get form() {
    return this.signupForm.controls;
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
      this.onSignup(captchaResponse);
    }
  }

  onSignup(token: string) {
    this.registrationError = '';

    this.signupForm.value.captcha = token;

    this._AuthService.signup(this.signupForm.value).subscribe(
      res => {
        console.log(res);
        if (res['status'] === 'failed') {
          this.isLoading = false;
        } else {
          this._Router.navigate(['/dashboard'])
        }
      },
      err => {
        console.log(err);
        this.isLoading = false;
      });
  }
}
