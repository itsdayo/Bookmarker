import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Page } from '../../../models/page.model.client';
import { PageService } from '../../../services/page.service.client';
@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css'],
  standalone: false,
})
export class PageEditComponent implements OnInit {
  uid: string = '';
  wid: string = '';
  pid: string = '';
  page: Page = {
    websiteId: '',
    name: '',
    description: '',
  };
  name: string = '';
  description: string = '';
  pages: Page[] = [];
  isLoading: boolean = false;

  @ViewChild('f') pageForm?: NgForm;
  constructor(
    private activatedRoute: ActivatedRoute,
    private pageService: PageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.uid = params['uid'];
      this.wid = params['wid'];
      this.pid = params['pid'];
      this.pageService.findPageById(this.pid).subscribe((page: Page) => {
        this.page = page;
      });
      this.pageService
        .findPageByWebsiteId(this.wid)
        .subscribe((pages: Page[]) => {
          this.pages = pages;
        });
    });
  }

  delete() {
    this.pageService.deletePage(this.pid).subscribe((pages: Page[]) => {
      this.router.navigate(['/user', this.uid, 'website', this.wid, 'page']);
    });
  }
  update() {
    this.isLoading = true;
    this.name = this.pageForm?.value.name;
    this.description = this.pageForm?.value.description;
    const newPage: Page = {
      id: this.pid,
      name: this.name,
      websiteId: this.wid,
      description: this.description,
    };
    this.pageService.updatePage(this.pid, newPage).subscribe((page: Page) => {
      this.isLoading = false;
      this.router.navigate(['/user', this.uid, 'website', this.wid, 'page']);
    });
  }
}
