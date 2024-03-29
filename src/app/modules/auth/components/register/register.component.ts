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
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(10)]),
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
    else if(this.email?.hasError('emailExists')){
      return "This email is already in use !";
    }

    return "";
  }

  getUsernameControlErrors(){

    if(this.username?.hasError('required')){
      return "You must enter a value !";
    }

    if(this.username?.hasError('usernameExists')){
      return "This username is already in use !";
    }

    return "";
  }

  getPasswordControlErrors(){

    if(this.password?.hasError('required')){
      return "You must enter a value !";
    }

    if(this.password?.hasError('minlength')){
      return "Password must have at least 10 characters !";
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

    if(this.confirmPassword?.hasError('minlength')){
      return "Password must have at least 10 characters !";
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
    
    return "";
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

  checkEmail(event: any){

    if(this.email?.hasError('required') || this.email?.hasError('email')) { return; }

    var emailValue:string = event.target.value;

    if(emailValue === "") { return; }

    this.authService.checkEmail(emailValue)
      .subscribe({
        next: (resp) => {
          
          if(resp == true)
          {
            this.email?.setErrors({'emailExists' : true});
          }
          else
          {
            this.email?.setErrors({'emailExists' : null});
            this.email?.updateValueAndValidity();
          }

        },
        error: (err) => {

          console.error(err);
          this.snackBarService.openSnackBar("Something went wrong. Please reload.");
        }
      })

  }

  checkUserName(event: any){
    if(this.username?.hasError('required')) { return; }

    var usernameValue:string = event.target.value;

    if(usernameValue === "") { return; }

    this.authService.checkUsername(usernameValue)
      .subscribe({
        next: (resp) => {
          
          if(resp == true)
          {
            
            this.username?.setErrors({'usernameExists' : true});
          }
          else
          {
            this.username?.setErrors({'usernameExists' : null});
            this.username?.updateValueAndValidity();
          }

        },
        error: (err) => {

          console.error(err);
          this.snackBarService.openSnackBar("Something went wrong. Please reload.");
        }
      })

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

          this.router.navigate(["/auth/login"]);
          this.snackBarService.openSnackBar("Registered Successfully !");
        },
        error: (err) =>{

          this.loading = false;
          console.error(err);
          this.snackBarService.openSnackBar(err.message);
        }
      });
  }
}