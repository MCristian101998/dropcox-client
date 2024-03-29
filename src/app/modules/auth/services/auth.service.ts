import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../models/LoginDto';
import { LoginResponseDto } from '../models/LoginResponseDto';
import { RegisterDto } from '../models/RegisterDto';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginData: LoginDto){

    return this.http.post<LoginResponseDto>(environment.apiBaseUrl + "authentication/login", loginData);
  }

  register(registerData: RegisterDto){
    
    return this.http.post<any>(environment.apiBaseUrl + "users/register", registerData);
  }

  checkUsername(username:string){
    return this.http.get(environment.apiBaseUrl + "users/username-exists/" + username);
  }

  checkEmail(email: string){
    return this.http.get(environment.apiBaseUrl + "users/email-exists/" + email);
  }
}
