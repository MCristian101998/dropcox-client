import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { SnackBarService } from 'src/app/shared/services/snackBarService';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    HttpClientModule
  ],
  providers:[
    AuthService,
    SnackBarService
  ]
})
export class AuthModule { }
