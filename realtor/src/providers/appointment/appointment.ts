import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Constants } from '../constants/constants'
/*
  Generated class for the AppointmentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppointmentProvider {
  data: any;
  appData: any;
  appDataStatus:any;
  constructor(public http: HttpClient) {
    this.data = null;
    this.appData = null;
    this.appDataStatus = null;
  }
  addAppointment(appData) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.URL_ADD_APPOINTMENT, appData)
        .subscribe(data => {
          this.data = data;
          resolve(this.data)
        },
          err => {
            reject(err);
          }
        )
    })
  }

  getAppointment(userData) {
    return new Promise((resolve, reject) => {
      this.http.post(Constants.URL_GET_APPOINTMENTS, userData)
        .subscribe(data => {
          this.appData = data;
          resolve(this.appData)
        },
          err => {
            reject(err);
          }
        )
    })
  }
  changeAppointmentStatus(appData){
    return new Promise((resolve,reject)=>{
      this.http.post(Constants.URL_CHANGE_APPOINTMENT_STATUS,appData)
        .subscribe(data=>{
          this.appDataStatus=data;
          resolve(this.appDataStatus)
        },
        err =>{
          reject(err);
        }
      )
    })
  }
}
