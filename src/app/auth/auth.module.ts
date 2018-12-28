import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from "./auth-routing.module";

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [LoginComponent, SignupComponent, ForgotPasswordComponent]
})
export class AuthModule { }
