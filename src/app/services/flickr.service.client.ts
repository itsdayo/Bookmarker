import { Injectable } from '@angular/core';
import { Page } from '../models/page.model.client'
import { map } from 'rxjs/operators'
import {Http, Response} from '@angular/http';
import { environment } from '../../environments/environment'
// injecting service into module
@Injectable()

export class FlickrService {

 

  baseUrl = environment.baseUrl;

  constructor(private http: Http) { }

key = '803e2e11a41ac4b279b4b4d5edc68a8c';

urlBase =  "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";



searchPhotos(searchTerm: any){
  const url = this.urlBase.replace('API_KEY', this.key).replace('TEXT', searchTerm)
  return this.http.get(url)
  
}
}