import { Injectable } from "@angular/core";
import { Widget } from "../models/widget.model.client";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
// injecting service into module
@Injectable()
export class WidgetService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  createWidget(pageId: string, widget: Widget) {
    const url = this.baseUrl + "/api/page/" + pageId + "/widget";
    return this.http.post<Widget>(url, widget).pipe(
      map((response) => {
        return response;
      })
    );
  }

  findWidgetByPageId(pageId: string) {
    const url = this.baseUrl + "/api/page/" + pageId + "/widget";
    return this.http.get<Widget[]>(url).pipe(
      map((response) => {
        return response;
      })
    );
  }

  findWidgetById(widgetId: string) {
    const url = this.baseUrl + "/api/widget/" + widgetId;
    return this.http.get<Widget>(url).pipe(
      map((response) => {
        return response;
      })
    );
  }

  updateWidget(widgetId: string, widget: Widget) {
    const url = this.baseUrl + "/api/widget/" + widgetId;
    return this.http.put<Widget>(url, widget).pipe(
      map((response) => {
        return response;
      })
    );
  }
  deleteWidget(widgetId: string) {
    const url = this.baseUrl + "/api/widget/" + widgetId;
    return this.http.delete<Widget[]>(url).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
