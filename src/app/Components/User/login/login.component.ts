import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../services/shared.service.client';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm?: NgForm;

  //properties
  username: string = '';
  password: string = '';
  errorFlag: boolean = false;
  errorMsg = 'Invaild username or password!';

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit() {}

  login() {
    this.username = this.loginForm?.value.username;
    this.password = this.loginForm?.value.password;

    this.userService.login(this.username, this.password).subscribe({
      next: (data: User) => {
        this.sharedService.user = data; // Store the logged-in user   
      },
      error: (error) => {
        console.error('Login failed:', error); // Handle error appropriately
        alert('Login failed. Please check your credentials.'); // User feedback
      },
      complete: () => {
        this.router.navigate(['/user']); // Navigate to the user page
      },
    });
  }
}
