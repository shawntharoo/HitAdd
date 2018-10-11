import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { RetrieveAdsProvider } from '../../providers/retrieve-ads/retrieve-ads';
import { CallNumber } from '@ionic-native/call-number';
import { DateTimeModalPage } from '../date-time-modal/date-time-modal';
import { AppointmentProvider } from '../../providers/appointment/appointment';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  appReqUserData: any = {
    phone_number: window.localStorage.getItem('phone_number')
  }
  favoriteAdds : any;
  addFavoriteData: any = {
    phone_number: "",
    ad_id: ""
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public retrieveAds: RetrieveAdsProvider, public alertCtrl: AlertController,public callNumber: CallNumber, public modalCtrl:ModalController, public appService:AppointmentProvider, public statusBar:StatusBar) {

  }
  openAddAppointment(ad) {
    let appModal = this.modalCtrl.create(DateTimeModalPage, { "_id": ad._id });
    appModal.present();
    appModal.onDidDismiss(data => {
      if (data.message != 'dismiss') {
        this.appService.getAppointment(this.appReqUserData).then((response) => {
          let alert =this.alertCtrl.create();
          alert.setTitle('Appointment')
          alert.setMessage('Appointment Added!')
          alert.addButton('Ok')
          alert.present()
          // this.appointmentList = response;
          // this.appointmentDisable = false;
          // this.stepType = "Appointment";
          // console.log(this.appointmentList)
        },
          (err) => {
            
          }
        )

      }
      console.log(data)
    })

  }
  call(numArray) {
    

    if (numArray.length > 1) {
      let alert = this.alertCtrl.create();
      alert.setTitle('Select number');
      for (var i = 0; i < numArray.length; i++) {
        alert.addInput({
          type: 'radio',
          label: numArray[i],
          value: numArray[i],
          checked: false
        })
      }
      alert.addButton('Cancel');
      alert.addButton({
        text: 'Ok',
        handler: (data: any) => {
          // this.callNumber
          this.callNumber.callNumber(data, true).then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
          console.log('Radio data:', data);

        }
      });
      alert.present();
    } else if (numArray.length == 1 && numArray[0] != "") {
      let alert = this.alertCtrl.create()
      alert.setTitle('Confirm Call')
      alert.setMessage('Are you sure you want to call ' + numArray[0] + ' ?')
      alert.addButton({
        text: 'Ok',
        handler: (data: any) => {
          this.callNumber.callNumber(numArray, true).then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
        }
      })
      alert.addButton('Cancel')
      alert.present();

    } else if (numArray.length == 1 && numArray[0] == "") {
      let alert = this.alertCtrl.create()
      alert.setTitle('Contact Number');
      alert.setMessage('Sorry! No number available');
      alert.addButton('Ok')
      alert.present();
    }
  }
  ionViewDidEnter() {
    this.retrieveAds.retrieveFavoriteAds(this.appReqUserData).then((response) => {
      this.favoriteAdds = response[0].favorite;
      console.log(this.favoriteAdds)
    }, err => {

    })
  }

  removeFromFavorite(add){
    this.addFavoriteData.phone_number = window.localStorage.getItem('phone_number');
    this.addFavoriteData.ad_id = add._id;
    this.retrieveAds.removeFromFavoriteAds(this.addFavoriteData).then((response) => {
      this.favoriteAdds = response['favorite'];
    }, err => {

    })
  }

  ionViewWillEnter() {
    this.statusBar.styleDefault();
  }

}
