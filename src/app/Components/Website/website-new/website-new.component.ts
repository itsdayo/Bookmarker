import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebsiteService } from '../../../services/website.service.client';
import { Website } from '../../../models/website.model.client';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css'],
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('f') websiteForm?: NgForm;

  websites: Website[] | undefined;
  uid: string = '';
  wid: string = '';
  name: string = '';
  description: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private websiteService: WebsiteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.uid = params['uid'];
      this.wid = params['wid'];
      this.websiteService
        .findWebsitesByUser(this.uid)
        .subscribe((websites: Website[]) => {
          this.websites = websites;
        });
    });
  }

  create() {
    this.name = this.websiteForm?.value.name;
    this.description = this.websiteForm?.value.description;
    const newWebsite: Website = {
      developerId: this.uid,
      name: this.name,
      description: this.description,
    };

    this.websiteService
      .createWebsite(this.uid, newWebsite)
      .subscribe((website: Website) => {
        this.router.navigate(['/user/', this.uid, 'website']);
      });
  }
}
