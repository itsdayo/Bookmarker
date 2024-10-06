import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { WidgetService } from '../../../services/widget.service.client'
import { Widget } from '../../../models/widget.model.client'
@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {
wgid: string='';
widgets?: Widget[];
pid: string='';
  widget: Widget= {
    widgetType: '',
    pageId: ''
  };
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router ) { }

  ngOnInit() {
  	this.activatedRoute.params.subscribe(params => {
  		this.wgid = params['wgid'];
      this.pid = params['pid'];
  		 this.widgetService.findWidgetById(this.wgid).subscribe(
         (widget:Widget)=> {
           this.widget = widget
         });  		
  	})

  
  }


}
