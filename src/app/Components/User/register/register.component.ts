import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/shared.service.client';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false,
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') registerForm?: NgForm;
  username: string = '';
  password: string = '';
  verifyPassword: string = '';
  passwordError: boolean = false;
  usernameError: boolean = false;
  isLoading: boolean = false;
  showPassword: boolean = false;
  showVerifyPassword: boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.passwordError = false;
    this.usernameError = false;
  }

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
      const passwordInput = document.getElementById(
        'password'
      ) as HTMLInputElement;
      if (passwordInput) {
        passwordInput.type = this.showPassword ? 'text' : 'password';
      }
    } else if (field === 'verifyPassword') {
      this.showVerifyPassword = !this.showVerifyPassword;
      const verifyPasswordInput = document.getElementById(
        'verifyPassword'
      ) as HTMLInputElement;
      if (verifyPasswordInput) {
        verifyPasswordInput.type = this.showVerifyPassword
          ? 'text'
          : 'password';
      }
    }
  }

  register() {
    if (this.isLoading) return;

    this.username = this.registerForm?.value.username?.toLowerCase() || '';
    this.password = this.registerForm?.value.password;
    this.verifyPassword = this.registerForm?.value.verifyPassword;

    if (this.password !== this.verifyPassword) {
      this.passwordError = true;
      this.usernameError = false;
    } else {
      this.isLoading = true;
      this.passwordError = false;
      this.usernameError = false;
      this.userService
        .findUserByUsername(this.username)
        .subscribe((data: any) => {
          if (!data) {
            this.userService.register(this.username, this.password).subscribe(
              (data: User) => {
                this.sharedService.user = data;
                this.isLoading = false;
                this.router.navigate(['/user']);
              },

              (error: any) => {
                console.log(error.message);
                this.usernameError = true;
                this.isLoading = false;
              }
            );
          } else {
            this.usernameError = true;
            this.isLoading = false;
          }
        });
    }
  }
}

// if(user){
// 	this.usernameError = true
// 	this.passwordError= false;
// }else {

// 	this.passwordError= false;
// 	this.usernameError = false;
// 	const newUser: User ={
// 		_id : "",
// 		username : this.username,
// 		password : this.password,
// 		firstName : '',
// 		lastName : '',
// 		email : ''}
