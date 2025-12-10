import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
// injecting service into module
@Injectable()
export class SecretKeysService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getSecretKeys() {
    const url = this.baseUrl + '/env';
    return this.http.get(url);
  }
}
