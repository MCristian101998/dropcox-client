import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../models/LoginDto';
import { RegisterDto } from '../models/RegisterDto';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginData: LoginDto){

    return this.http.post<any>(environment.apiBaseUrl + "auth", loginData);
  }

  register(registerData: RegisterDto){
    
    return this.http.post<any>(environment.apiBaseUrl + "auth", registerData);
  }
}
