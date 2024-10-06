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
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') registerForm?: NgForm;
  username: string = '';
  password: string = '';
  verifyPassword: string = '';
  passwordError: boolean = false;
  usernameError: boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit() {
    this.passwordError = false;
    this.usernameError = false;
  }

  register() {
    this.username = this.registerForm?.value.username;
    this.password = this.registerForm?.value.password;
    this.verifyPassword = this.registerForm?.value.verifyPassword;

    if (this.password !== this.verifyPassword) {
      this.passwordError = true;
      this.usernameError = false;
    } else {
      this.passwordError = false;
      this.userService
        .findUserByUsername(this.username)
        .subscribe((data: any) => {
          if (!data) {
            this.userService.register(this.username, this.password).subscribe(              
              (data: User) => {
                this.sharedService.user = data;
                this.router.navigate(['/user']);
              },

              (error: any) => {
                console.log(error.message);
                this.usernameError = true;
              }
            );
          } else {
            this.usernameError = true;
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
