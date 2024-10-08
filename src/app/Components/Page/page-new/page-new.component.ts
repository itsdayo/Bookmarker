import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Page } from '../../../models/page.model.client'
import { PageService } from '../../../services/page.service.client'


@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {
uid: string = "";
wid: string = "";
name:string = "";
description: string= "";



@ViewChild('f') pageForm?: NgForm;  
  constructor(private activatedRoute: ActivatedRoute, private pageService: PageService, private router: Router) { }

  ngOnInit() {
  	this.activatedRoute.params.subscribe(params =>{
  		this.uid = params['uid'];
  		this.wid = params['wid'];

  	})
  }
create(){
	this.name = this.pageForm?.value.name
	this.description = this.pageForm?.value.description
	const newPage: Page ={
		name: this.name,
		websiteId: this.wid,
		description: this.description
	}
this.pageService.createPage(this.wid, newPage).subscribe(
  (page: Page)=>{
   
    this.router.navigate(['user',this.uid,'website',this.wid, 'page'])
  })

}
}
