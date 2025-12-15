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
  standalone: false,
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm?: NgForm;

  //properties
  username: string = '';
  password: string = '';
  errorFlag: boolean = false;
  errorMsg = 'Invaild username or password!';
  isLoading: boolean = false;
  showPassword: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService
  ) {}

  ngOnInit() {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
    }
  }

  login() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.errorFlag = false;
    this.username = this.loginForm?.value.username?.toLowerCase()?.trim() || '';
    this.password = this.loginForm?.value.password?.trim() || '';

    this.userService.login(this.username, this.password).subscribe({
      next: (data: User) => {
        this.sharedService.user = data; // Store the logged-in user
      },
      error: (error) => {
        console.error('Login failed:', error); // Handle error appropriately
        this.errorFlag = true;
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        this.router.navigate(['/user']); // Navigate to the user page
      },
    });
  }
}
