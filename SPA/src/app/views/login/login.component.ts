import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../_core/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticatedResponse } from 'src/app/_core/_models/authenticated-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup = {} as FormGroup;
  invalidLogin: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  login() {
    this.authService.login(this.formLogin?.value).subscribe({
      next: (response: AuthenticatedResponse) => {
        const token = response.token;
        const refreshToken = response.refreshToken;
        localStorage.setItem("jwtRefreshToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        this.invalidLogin = false;
        this.router.navigate(["/customers"]);
      },
      error: (err: HttpErrorResponse) => this.invalidLogin = true
    })
  }
}
