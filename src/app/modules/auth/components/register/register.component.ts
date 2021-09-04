import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snackBarService';
import { RegisterDto } from '../../models/RegisterDto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading: boolean = false;

  registerForm = new FormGroup({

    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  })

  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  getFirstNameControlErrors(){

    if(this.firstName?.hasError('required')){
      return "You must enter a value !";
    }

    return "";
  }

  getLastNameControlErrors(){

    if(this.lastName?.hasError('required')){
      return "You must enter a value !";
    }

    return "";
  }

  getEmailControlErrors(){

    if(this.email?.hasError('required')){
      return "You must enter a value !";
    }
    else if(this.email?.hasError('email')){
      return "You must enter a valid email address !";
    }

    return "";
  }

  getUsernameControlErrors(){

    if(this.username?.hasError('required')){
      return "You must enter a value !";
    }

    return "";
  }

  getPasswordControlErrors(){

    if(this.password?.hasError('required')){
      return "You must enter a value !";
    }

    return "";
  }

  getConfirmPasswordControlErrors(){

    if(this.confirmPassword?.hasError('required')){
      return "You must enter a value !";
    }
    
    if(this.confirmPassword?.hasError('noMatch')){
      return "Passwords must match !";
    }

    return "";
  }

  confirmPasswordChanged(event: any){

    if(this.password?.invalid || this.confirmPassword?.invalid) { return }

    var confirmPasswordValue = event.target.value;
    var passwordValue = this.password?.value;

    if(passwordValue !== confirmPasswordValue){

      this.confirmPassword?.setErrors({'noMatch' : true});
    }
  }

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit(){
    if(this.registerForm.invalid){
      return;
    }

    this.loading = true;

    var registerData = new RegisterDto();

    registerData.firstName = this.firstName?.value;
    registerData.lastName = this.lastName?.value;
    registerData.email = this.email?.value;
    registerData.username = this.username?.value;
    registerData.password = this.password?.value;

    this.authService.register(registerData)
      .subscribe({
        next : (resp) =>{

          alert(resp);
          this.router.navigate(["/auth/login"]);
          this.snackBarService.openSnackBar("Registered Successfully !");
        }
      });
  }
}