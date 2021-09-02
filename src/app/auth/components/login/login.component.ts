import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginDto } from '../../models/LoginDto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({

    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])

  });

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  hidePassword: boolean = true;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  getUsernameControlErrors(){

    if(this.username?.hasError('required'))
    {
      return "You must enter a value !";
    }

    return "";
  }

  getPasswordControlErrors(){

    if(this.password?.hasError('required'))
    {
      return "You must enter a value !";
    }

    return "";
  }

  submit(){

    if(this.loginForm.invalid){
      return;
    }

    alert("mare submit");

    var loginData = new LoginDto();
    loginData.username = this.username?.value;
    loginData.password = this.password?.value;
    
    this.authService.login(loginData)
      .subscribe({
        next : (resp) => {

          //Salveaza token ul si userul din raspuns si redirect catre main page;
        }
      });
  }

}
