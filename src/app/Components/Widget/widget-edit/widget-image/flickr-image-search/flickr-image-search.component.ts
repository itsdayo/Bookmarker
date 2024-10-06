import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlickrService } from '../../../../../services/flickr.service.client';
import { WidgetService } from '../../../../../services/widget.service.client';
import { Widget } from '../../../../../models/widget.model.client';

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css'],
})
export class FlickrImageSearchComponent implements OnInit {
  uid: string = '';
  wid: string = '';
  pid: string = '';
  wgid: string = '';
  searchText: string = '';
  photos: any[] = [];
  widget?: Widget;

  constructor(
    private activatedRoute: ActivatedRoute,
    private flickrService: FlickrService,
    private router: Router,
    private widgetService: WidgetService
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

  searchPhoto() {
    this.flickrService.searchPhotos(this.searchText).subscribe((data: any) => {
      let val = data._body;
      val = val.replace('jsonFlickrApi(', '');
      val = val.substring(0, val.length - 1);
      val = JSON.parse(val);
      this.photos = val.photos.photo;
    });
  }

  selectPhoto(photo:any) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';

	
    this.widget!.url = url;

    this.widgetService
      .updateWidget(this.wgid, this.widget ?? {} as Widget)
      .subscribe((widget: Widget) => {
        this.router.navigate([
          'user',
          this.uid,
          'website',
          this.wid,
          'page',
          this.pid,
          'widget',
          this.wgid,
        ]);
      });
  }
}
