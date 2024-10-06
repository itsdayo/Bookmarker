import { Injectable } from '@angular/core';
import { Website } from '../models/website.model.client';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

// injecting service into module
@Injectable()
export class WebsiteService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  createWebsite(userId: string, website: Website) {
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    return this.http.post<Website>(url, website).pipe(
      map((response) => {
        return response;
      })
    );
  }

  findWebsitesByUser(userId: string) {
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    return this.http.get<Website[]>(url).pipe(
      map((response) => {
        return response;
      })
    );
  }

  findWebsiteById(websiteId: string) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this.http.get<Website>(url).pipe(
      map((response) => {
        return response;
      })
    );
  }

  updateWebsite(websiteId: string, website: Website) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this.http.put<Website>(url, website).pipe(
      map((response) => {
        return response;
      })
    );
  }

  deleteWebsite(websiteId: string) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this.http.delete<Website[]>(url).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
