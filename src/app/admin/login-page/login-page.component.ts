import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"

import { User } from '../../shared/interfaces'
import { AuthService } from '../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup
  disableButton: boolean = false
  errorMessage: string

  login() {
    event.preventDefault()
    this.disableButton = true
    const user: User = {
      email: this.email.value,
      password: this.password.value,
    }
    this.authService.login(user).subscribe(
      () => {
        this.disableButton = false
        this.loginForm.reset();
        this.router.navigate(['/admin', 'dashboard'])
      },
      () => {
        this.loginForm.reset()
        this.disableButton = false
      },
      () => {
        this.disableButton = false
      }
    )
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
    this.route.queryParams.subscribe((params: Params) => {
      if (!!params.loginAgain === true) {
        this.errorMessage = 'Koniec sesji, proszę ponownie zalogować się'
      }
    })
  }
}
