import {Injectable} from "@angular/core";
import {Login, LoginToken} from "../models/login.model";
import {SessionService} from "../shared/services/session.service";
import {Router} from "@angular/router";
import {AuthGuard} from "../shared/guard/auth.guard";
import Swal from "sweetalert2";

const AUTH_KEY = 'token';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private readonly sessionService: SessionService,
    private readonly router: Router,
    private authGuard: AuthGuard
  ) {
  }

  login(payload: Login): LoginToken | null {
    const {email, password} = payload;
    if (email === 'admin@gmail.com' && password === 'password') {
      const token: LoginToken = {token: '12345'};
      this.sessionService.set(AUTH_KEY, JSON.stringify(token));
      return token;
    }
    return null;
  }

  logout() {
    Swal.fire({
      title: 'Are you sure to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sessionService.remove('token');
        this.authGuard.isLoggedIn = false;
        this.router.navigateByUrl('login');
      }
    })
  }
}
