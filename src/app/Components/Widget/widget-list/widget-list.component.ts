import { Component, OnInit } from "@angular/core";
import { WidgetService } from "../../../services/widget.service.client";
import { Widget } from "../../../models/widget.model.client";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-widget-list",
  templateUrl: "./widget-list.component.html",
  styleUrls: ["./widget-list.component.css"],
})
export class WidgetListComponent implements OnInit {
  uid: string='';
  wid: string='';
  wgid: string='';
  pid: string='';
  widgets?: Widget[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private widgetService: WidgetService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.uid = params["uid"];
      this.wid = params["wid"];
      this.pid = params["pid"];
      this.widgetService
        .findWidgetByPageId(this.pid)
        .subscribe((widgets: Widget[]) => {
          this.widgets = widgets;
        });
    });
  }

  getYoutubeUrl(url:string) {
    let embedUrl = "https://www.youtube.com/embed/";
    const parsedUrl = url.split("/");
    //tranfer video url into embedded url

    embedUrl += parsedUrl[parsedUrl.length - 1];
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }
  parseHTML(text:string) {
    var parsedText = text.replace(/&lt;/g, "<").replace(/&gt;/g, ">");

    return parsedText;
  }
}
