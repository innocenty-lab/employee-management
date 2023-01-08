import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginField} from "../../models/login-field.model";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {LoginToken} from "../../models/login.model";
import {SessionService} from "../../shared/services/session.service";
import {AuthGuard} from "../../shared/guard/auth.guard";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title: string = "Login";
  loginForm!: FormGroup;
  field: typeof LoginField = LoginField;
  showPassword: boolean = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly sessionService: SessionService,
    private authGuard: AuthGuard
  ) {
  }

  buildForm(): void {
    this.loginForm = new FormGroup({
      [LoginField.EMAIL]: new FormControl('', [Validators.required, Validators.email]),
      [LoginField.PASSWORD]: new FormControl('', [Validators.required, Validators.minLength(4)]),
    })
  }

  ngOnInit(): void {
    this.buildForm();

    const authorize: boolean = (this.sessionService.get('token') !== null);
    if (authorize) {
      this.authGuard.isLoggedIn = true;
      this.router.navigateByUrl('dashboard').finally();
    }
  }

  onShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    // console.log("cek data submit: ", this.loginForm.value);
    const payload = this.loginForm.value;
    const token: LoginToken | null = this.authService.login(payload);
    if (token) {
      this.authGuard.isLoggedIn = true;
      this.router.navigateByUrl('dashboard');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Incorrect email or password',
      });
    }
  }

  isFieldValid(loginField: LoginField): string {
    const control: AbstractControl = this.loginForm.get(loginField) as AbstractControl;
    if (control && control.touched && control.invalid) {
      return 'is-invalid';
    } else if (control && control.valid) {
      return 'is-valid';
    } else {
      return '';
    }
  }
}
