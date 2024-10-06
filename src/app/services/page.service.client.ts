import { Injectable } from '@angular/core';
import { Page } from '../models/page.model.client'
import { map } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
// injecting service into module
@Injectable()

export class PageService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }



  createPage(websiteId:string, page: Page) {
   const url = this.baseUrl + '/api/website/'+ websiteId +'/page';
    return this.http.post<Page>(url, page).pipe(map(
      (response) => {
        return response;
      }

      ))
  
  }

  findPageByWebsiteId(websiteId: string) {
     const url = this.baseUrl + '/api/website/'+websiteId+'/page';
    return this.http.get<Page[]>(url).pipe(map(
      (response) => {
        return response;
      }

      ))
  
  }

  findPageById(pageId: string) {
    const url = this.baseUrl + '/api/page/'+ pageId;
    return this.http.get<Page>(url).pipe(map(
      (response) => {
        return response;
      }

      ))
    }
  

  updatePage(pageId:string, page:Page) {
     const url = this.baseUrl + '/api/page/'+ pageId;
    return this.http.put<Page>(url,page).pipe(map(
      (response) => {
        return response;
      }

      ))

  }
  deletePage(pageId:string) {
    const url = this.baseUrl + '/api/page/'+ pageId;
    return this.http.delete<Page[]>(url).pipe(map(
      (response) => {
        return response;
      }

      ))
}
}