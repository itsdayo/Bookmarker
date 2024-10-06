import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service.client';
import { User } from '../../../models/user.model.client';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../../services/shared.service.client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  uid: string = '';
  username: string = '1';
  email: string = '1';
  firstName: string = '1';
  lastName: string = '1';
  oldUsername: string = '';
  usernameTaken: boolean = false;
  submitSuccess: boolean = false;
  user: User = {
    id: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
  };

  aUser: User | undefined;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService,
    private router: Router
  ) {}

  @ViewChild('f') profileForm?: NgForm;

  ngOnInit() {
    this.user = this.sharedService.user;
    this.uid = this.user.id || '';
    this.username = this.user.username;
    this.email = this.user.email;
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.oldUsername = this.user.username;
  }
  update() {
    this.username = this.profileForm?.value.username;
    this.email = this.profileForm?.value.email;
    this.firstName = this.profileForm?.value.firstName;
    this.lastName = this.profileForm?.value.lastName;

    this.userService
      .findUserByUsername(this.username)
      .subscribe((user: User) => {
        this.aUser = user;
      });

    if (this.aUser && this.oldUsername !== this.username) {
      this.usernameTaken = true;
      this.submitSuccess = false;
    } else {
      const updateUser: User = {
        id: this.user.id,
        username: this.username,
        password: this.user.password,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      };

      this.userService
        .updateUser(this.uid, updateUser)
        .subscribe((user2: User) => {
          this.usernameTaken = false;
          this.submitSuccess = true;
        });
    }
  }
  logout() {
    this.userService
      .logout()
      .subscribe((data: any) => this.router.navigate(['/login']));
  }
}
