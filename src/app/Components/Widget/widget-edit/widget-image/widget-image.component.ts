import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WidgetService } from '../../../../services/widget.service.client';
import { Widget } from '../../../../models/widget.model.client';
import { NgForm } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
//import * as AWS from "aws-sdk/global";
import { S3 } from 'aws-sdk';
import { SecretKeysService } from '../../../../services/env.service.client';
@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css'],
})
export class WidgetImageComponent implements OnInit {
  uid: string = '';
  wid: string = '';
  pid: string = '';
  wgid: string = '';
  id: string = '';
  widgetType: string = '';
  pageId: string = '';
  size: number = 0;
  text: string = '';
  width: string = '';
  url: string = '';
  name: string = '';
  Name: string = '';
  myFile?: File;
  baseUrl: string = '';
  fileUrl: string = '';
  accessKeyId: string = '';
  secretAccessKey: string = '';

  widget: Widget = {
    widgetType: '',
    pageId: '',
  };
  imageType: string = 'url';

  @ViewChild('f') widgetForm?: NgForm;

  constructor(
    private activatedRoute: ActivatedRoute,
    private secretServiceKeys: SecretKeysService,
    private widgetService: WidgetService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.secretServiceKeys.getSecretKeys().subscribe((keys: any) => {
      this.accessKeyId = JSON.parse(keys._body).accessKeyId;
      this.secretAccessKey = JSON.parse(keys._body).secretAccessKey;
    });

    this.activatedRoute.params.subscribe((params) => {
      this.uid = params['uid'];
      this.wid = params['wid'];
      this.pid = params['pid'];
      this.wgid = params['wgid'];
      this.baseUrl = environment.baseUrl;
      this.imageType = 'url';
      this.widgetService
        .findWidgetById(this.wgid)
        .subscribe((widget: Widget) => {
          this.widget = widget;
        });
    });
  }
  changeImageStatus() {
    if (this.imageType === 'url') {
      this.imageType = 'file';
    } else {
      this.imageType = 'url';
    }
  }

  //   fileChange(files: any) {
  //     let file = files.target.files[0];

  //     const contentType = file.type;
  //     const bucket = new S3({
  //       accessKeyId: environment.accessKeyId,
  //       secretAccessKey: environment.secretAccessKey,
  //       region: "us-west-1",
  //     });
  //     const params = {
  //       Bucket: "web-maker",
  //       Key: file.name,
  //       Body: file,
  //       ACL: "public-read",
  //       ContentType: contentType,
  //     };
  //     var widgetService = this.widgetService.updateWidget.toString();

  //     bucket.upload(params, function (err, data) {
  //       if (err) {
  //         console.log("There was an error uploading your file: ", err);
  //         return false;
  //       }
  //       console.log("Successfully uploaded file.", data);
  //       this.fileUrl = data.Location;

  //       return true;
  //     });
  //for upload progress
  // bucket
  //   .upload(params)
  //   .on("httpUploadProgress", function (evt) {
  //     console.log(evt.loaded + " of " + evt.total + " Bytes");
  //   })
  //   .send(function (err, data) {
  //     if (err) {
  //       console.log("There was an error uploading your file: ", err);
  //       return false;
  //     }
  //     console.log("Successfully uploaded file.", data);
  //     this.fileUrl = data.Location;
  //     console.log(this.fileUrl);
  //     return true;
  //   });
  // }

  update(e: any) {
    if (this.imageType === 'file') {
      let file = e.target[4].files[0];
      const contentType = file.type;
      const bucket = new S3({
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
        region: 'us-west-1',
      });
      const params = {
        Bucket: 'web-maker0212690301',
        Key: file.name,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType,
        widgetService: this.widgetService,
        widgetForm: this.widgetForm?.value,
        widgetType: this.widget.widgetType,
        uid: this.uid,
        wid: this.wid,
        wgid: this.wgid,
        pid: this.pid,
        pageId: this.pageId,
        newSubmit: this.newSubmit,
        router: this.router,
      };
      // let widgetService = this.widgetService.updateWidget();
      // let widgetForm = this.widgetForm.value;
      var widgetService = this.widgetService.updateWidget.toString();
      bucket.upload(params, (err: any, data: any) => {
        if (err) {
          console.log('There was an error uploading your file: ', err);
          return false;
        }
        //  console.log("Successfully uploaded file.", data);
        var fileUrl = data.Location;
        this.name = params.widgetForm.name;
        //this.url = this.widgetForm.value.url;
        this.url = this.fileUrl;
        this.text = params.widgetForm.text;
        this.width = params.widgetForm.width;
        this.widgetType = params.widgetType;
        const updateWidget: Widget = {
          widgetType: this.widgetType,
          pageId: params.pageId,
          url: fileUrl,
          width: this.width,
          text: this.text,
          name: this.name,
        };
        params.newSubmit(params);
        params.widgetService
          .updateWidget(params.wgid, updateWidget)
          .subscribe((widget: Widget) => {});
        return true;
      });
    } else {
      this.name = this.widgetForm?.value.name;
      //this.url = this.widgetForm.value.url;
      this.url = this.widgetForm?.value.url;
      this.text = this.widgetForm?.value.text;
      this.width = this.widgetForm?.value.width;
      this.widgetType = 'IMAGE';
      const updateWidget: Widget = {
        widgetType: this.widgetType,
        pageId: this.pid,
        url: this.url,
        width: this.width,
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
  }

  newSubmit(params: any) {
    const updateWidget: Widget = {
      id: params.wgid,
      widgetType: params.widgetType,
      pageId: params.pid,

      width: '',
      text: '',
      name: '',
    };

    params.widgetService
      .updateWidget(params.wgid, updateWidget)
      .subscribe((widget: Widget) => {
        params.router.navigate([
          '/user',
          params.uid,
          'website',
          params.wid,
          'page',
          params.pid,
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
