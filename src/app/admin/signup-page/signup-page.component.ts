import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { User } from 'src/app/shared/interfaces';
import { AlertService } from '../shared/services/alert.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  userForm: FormGroup

  get email() {
    return this.userForm.get('email')
  }

  get password() {
    return this.userForm.get('password')
  }

  signUp() {
    const user: User = {
      email: this.email.value,
      password: this.password.value
    }
    this.authService.signUp(user).subscribe(
      () => {
        this.alertService.success('Użytkowni został zarejestrowany');
        this.userForm.reset();
        setTimeout(() => {
          this.router.navigate(['/admin', 'login'])
        }, 2000)
      },
      () => {
        this.userForm.reset()
      }
    )
  }

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

}
