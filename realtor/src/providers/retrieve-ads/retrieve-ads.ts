import { Injectable } from '@angular/core';
//import { Http,RequestOptions, Request, RequestMethod,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import {Constants} from '../constants/constants'
/*
  Generated class for the RetrieveAdsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RetrieveAdsProvider {
  data: any;
  constructor(public http: HttpClient) {
    this.data = null;
    //console.log('Hello RetrieveAdsProvider Provider');
  }
  getAds(adData) {
    console.log(adData);
    // let header= new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: header });
    return new Promise((resolve, reject) => {
      this.http.post(Constants.URL_GETADS,adData)
        .subscribe(res => {
          console.log(res)
          resolve(res);

        },
          err => {
            console.log(err)
            reject(err);
          }
        )

    });
  }

retrieveTopAds() {
  return new Promise((resolve, reject) => {
    this.http.get(Constants.URL_GETTOPADS)
    .subscribe(res => {
      resolve(res);
    }, err => {
      reject(err);
    })
  });
}

retrieveFavoriteAds(userData) {
  return new Promise((resolve, reject) => {
    this.http.post(Constants.URL_GETFAVORITEADS, userData)
    .subscribe(res => {
      resolve(res);
    }, err => {
      reject(err);
    })
  });
}

addToFavoriteAds(favoritedata) {
  return new Promise((resolve, reject) => {
    this.http.post(Constants.URL_ADDFAVORITE, favoritedata)
    .subscribe(res => {
      resolve(res);
    }, err => {
      reject(err);
    })
  });
}

removeFromFavoriteAds(favoritedata) {
  return new Promise((resolve, reject) => {
    this.http.post(Constants.URL_REMOVEFAVORITE, favoritedata)
    .subscribe(res => {
      resolve(res);
    }, err => {
      reject(err);
    })
  });
}

}
