import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snackBarService';
import { LoginDto } from '../../models/LoginDto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading:boolean = false;

  loginForm = new FormGroup({

    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])

  });

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  hidePassword: boolean = true;

  constructor(
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private router: Router
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

    this.loading = true;

    alert("mare submit");

    var loginData = new LoginDto();
    loginData.username = this.username?.value;
    loginData.password = this.password?.value;
    
    this.authService.login(loginData)
      .subscribe({
        next : (resp) => {

          localStorage.setItem("access_token", resp.token);
          localStorage.setItem("current_user", JSON.stringify(resp.loggedUser));

          this.router.navigate([""]);
        },
        error: () =>{

          this.loading = false;
          this.snackBarService.openSnackBar("Something went wrong. Please try again.");
        }
      });
  }
}
