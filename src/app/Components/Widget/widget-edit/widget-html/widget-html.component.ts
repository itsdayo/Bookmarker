import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetService } from '../../../../services/widget.service.client';
import { Widget } from '../../../../models/widget.model.client';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css'],
  standalone: false,
})
export class WidgetHtmlComponent implements OnInit {
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
  isLoading: boolean = false;

  widget: Widget = {
    id: '',
    widgetType: '',
    pageId: '',
    text: '',
    name: '',
  };

  // Quill editor configuration
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
      ['html'], // Enable HTML editing
    ],
    syntax: true,
  };

  editorFormat: 'html' = 'html';
  constructor(
    private activatedRoute: ActivatedRoute,
    private widgetService: WidgetService,
    private router: Router
  ) {}

  @ViewChild('f') widgetForm?: NgForm;
  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.uid = params['uid'];
      this.wid = params['wid'];
      this.pid = params['pid'];
      this.wgid = params['wgid'];
      this.widgetService
        .findWidgetById(this.wgid)
        .subscribe((widget: Widget) => {
          this.widget = {
            ...widget,
            text: widget.text || '',
            name: widget.name || '',
          };
        });
    });
  }

  update() {
    this.isLoading = true;
    this.name = this.widgetForm?.value.name || this.widget.name;
    this.text = this.widget.text; // Use widget.text directly from Quill editor

    const updateWidget: Widget = {
      id: this.wgid,
      widgetType: this.widget.widgetType,
      pageId: this.pid,
      text: this.text,
      name: this.name,
    };

    this.widgetService
      .updateWidget(this.wgid, updateWidget)
      .subscribe((widget: Widget) => {
        this.isLoading = false;
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
