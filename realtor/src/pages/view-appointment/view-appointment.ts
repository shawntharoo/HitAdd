import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewAppointmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-appointment',
  templateUrl: 'view-appointment.html',
})
export class ViewAppointmentPage {
  //appDetails:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.appDetails = {
    //   app_date:this.navParams.get('app_date'),
    //   comments:this.navParams.get('comments'),
    //   ad_details:this.navParams.get('ad_id')
    // }
  }
  
  appDetails:any = {
    app_date:this.navParams.get('app_date'),
    comments:this.navParams.get('comments'),
    ad_details:this.navParams.get('ad_id')
  }
  ionViewDidEnter() {
    console.log(this.appDetails);
  }
  
  // toLocalDate(date){
  //   console.log(date)
  //   let newDate = new Date(date)
  //   console.log(newDate)
  //   //return newDate.toLocaleDateString();
  // }

}
