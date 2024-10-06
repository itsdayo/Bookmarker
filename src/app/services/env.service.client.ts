import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Http, Response } from "@angular/http";
import { environment } from "../../environments/environment";
// injecting service into module
@Injectable()
export class SecretKeysService {
  baseUrl = environment.baseUrl;
  constructor(private http: Http) {}

  getSecretKeys() {
    const url = this.baseUrl + "/env";
    return this.http.get(url).pipe(
      map((response: Response) => {
        return response;
      })
    );
  }
}
