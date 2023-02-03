import { TokenService } from './../_services/token.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthenticatedResponse } from '../_models/authenticated-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService,
    private tokenService: TokenService,
  ) { }

  async canActivate() {
    const token = localStorage.getItem("jwtRefreshToken") ?? '';
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    const isRefreshSuccess = await this.tryRefreshingTokens(token);
    if (!isRefreshSuccess) {
      this.router.navigate(["/not-logged-in"]);
    }
    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(token: string): Promise<boolean> {
    // Try refreshing tokens using refresh token
    const refreshToken: string = localStorage.getItem("refreshToken") ?? '';
    if (!token || !refreshToken) {
      return false;
    }
    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });
    let isRefreshSuccess: boolean;

    const refreshRes = await new Promise<AuthenticatedResponse>((resolve, reject) => {
      this.tokenService.refreshToken(credentials).subscribe({
        next: (res: AuthenticatedResponse) => resolve(res),
        error: (_) => {
          reject; isRefreshSuccess = false;
          localStorage.setItem("jwtRefreshToken", '');
          localStorage.setItem("refreshToken", '');
          this.router.navigate(["/not-logged-in"]);
        }
      });
    });

    localStorage.setItem("jwtRefreshToken", refreshRes.token);
    localStorage.setItem("refreshToken", refreshRes.refreshToken);
    isRefreshSuccess = true;

    return isRefreshSuccess;
  }
}
