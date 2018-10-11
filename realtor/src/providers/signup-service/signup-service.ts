//import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants/constants'

/*
  Generated class for the SignupServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SignupServiceProvider {
  data: any;

  constructor(public http: HttpClient) {
    this.data = null;
  }
  userSignup(userData) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.URL_REGISTER, userData)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        },
          err => {
            reject(err);
          }
        )

    });
  }
  userVerify(userData) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.URL_VERIFY, userData)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        },
          err => {
            reject(err);
          }
        )
    })
  }

}
