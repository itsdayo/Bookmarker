import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetService } from '../../../../services/widget.service.client';
import { Widget } from '../../../../models/widget.model.client';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css'],
})
export class WidgetHeaderComponent implements OnInit {
  uid: string = '';
  wid: string = '';
  pid: string = '';
  wgid: string = '';
  id: string = '';
  widgetType: string = '';
  pageId: string = '';
  size?: number;
  text?: string;
  width?: string;
  url?: string;
  name?: string;
  widget: Widget = {
    widgetType: '',
    pageId: '',
  };

  @ViewChild('f') widgetForm?: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private widgetService: WidgetService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.uid = params['uid'];
      this.wid = params['wid'];
      this.pid = params['pid'];
      this.wgid = params['wgid'];
      this.widgetService
        .findWidgetById(this.wgid)
        .subscribe((widget: Widget) => {
          this.widget = widget;
        });
    });
  }

  update() {
    this.name = this.widgetForm?.value.name;
    this.size = this.widgetForm?.value.size;
    this.text = this.widgetForm?.value.text;

    const updateWidget: Widget = {
      id: this.wgid,
      widgetType: this.widget.widgetType,
      pageId: this.pid,
      size: this.size,
      text: this.text,
      name: this.name,
    };

    this.widgetService
      .updateWidget(this.wgid, updateWidget)
      .subscribe((widget: Widget) => {
        this.router.navigate([
          '/user',
          this.uid,
          'website',
          this.wid,
          'page',
          this.pid,
          'widget',
        ]);
      });
  }

  delete() {
    this.widgetService
      .deleteWidget(this.wgid)
      .subscribe((widgets: Widget[]) => {
        this.router.navigate([
          '/user',
          this.uid,
          'website',
          this.wid,
          'page',
          this.pid,
          'widget',
        ]);
      });
  }
}
