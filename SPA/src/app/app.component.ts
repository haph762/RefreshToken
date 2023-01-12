import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenService } from './_core/_services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RefreshToken';

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private tokenService: TokenService) { }
  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwtRefreshToken");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    return false;
  }

  logOut = () => {
    this.tokenService.revoke().subscribe({
      next: () => {
        console.log('user is logout');
      },
      error: () => { },
    });
    localStorage.removeItem("jwtRefreshToken");
    localStorage.removeItem("refreshToken");
    this.router.navigate(["/login"]);
  }
}
