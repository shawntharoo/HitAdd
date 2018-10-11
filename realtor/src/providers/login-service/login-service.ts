import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Constants} from '../constants/constants';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class LoginServiceProvider {
  user: any;
  constructor(public http: HttpClient) {
    this.user = null;

  }
  userLogin(userData) {
    return new Promise(((resolve, reject) => {
      this.http.post(Constants.URL_LOGIN, userData)
        .subscribe(data => {
          this.user = data;
          resolve(this.user);
        },
          err => {
            reject(err);
          }
        )
    }))
  }
  loggedinUser(userData) {
    this.user = userData;
  }

  getLoggedinUser() {
    return new Promise(resolve => {
      resolve(this.user);
    });
  }

}
