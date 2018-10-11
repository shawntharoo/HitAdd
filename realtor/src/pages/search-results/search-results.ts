import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { RetrieveAdsProvider } from '../../providers/retrieve-ads/retrieve-ads';
import { DateTimeModalPage } from '../date-time-modal/date-time-modal';
import { AppointmentProvider } from '../../providers/appointment/appointment';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the SearchResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage {
  stepType: string = "Requirement";
  listDisable: boolean = true;
  appointmentDisable: boolean = true;
  adList: any;
  appointmentList: any;
  addFavoriteData: any = {
    phone_number: "",
    ad_id: ""
  }
  allAdds: any;
  favAdds: any;
  favColor: string = "#bdbdbd"
  constructor(public navCtrl: NavController, public navParams: NavParams, public retrieveAds: RetrieveAdsProvider, public modalCtrl: ModalController, public appService: AppointmentProvider, public alertCtrl: AlertController, public callNumber: CallNumber) {
    this.appointmentList = [];
  }
  req: any = {
    type: this.navParams.get('type'),
    category: this.navParams.get('category'),
    location: this.navParams.get('location'),
    minArea: this.navParams.get('areaRange').lower,
    maxArea: this.navParams.get('areaRange').upper,
    noOfRooms: this.navParams.get('noOfRooms'),
    minPrice: this.navParams.get('priceRange').lower,
    maxPrice: this.navParams.get('priceRange').upper,
    _id: '',
    phone_number: window.localStorage.getItem('phone_number')
  }
  appReqUserData: any = {
    phone_number: window.localStorage.getItem('phone_number'),
    status: 2
  }
  exitSearch() {
    this.navCtrl.popToRoot();
  }
  editReq() {
    this.navCtrl.pop()
  }
  confirmReq() {
    // this.listDisable = false;
    //   this.stepType = "Lists";
console.log("")
    this.retrieveAds.getAds(this.req).then((response) => {
      this.retrieveAds.retrieveFavoriteAds(this.appReqUserData).then((fav) => {
        this.allAdds = response;
        this.favAdds = fav[0].favorite;
        this.allAdds.forEach(item => {
          for (var x = 0; x < this.favAdds.length; x++) {
            if (item._id == this.favAdds[x]._id) {
              console.log("here");
              item.fav = true;
            }
          }
        });
        this.listDisable = false;
        this.stepType = "Lists";
        this.adList = this.allAdds;
      }, (err) => {
        console.log(err)
      })
    }, (err) => {
      console.log(err)
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
  openAddAppointment(ad) {
    let appModal = this.modalCtrl.create(DateTimeModalPage, { "_id": ad._id });
    appModal.present();
    appModal.onDidDismiss(data => {
      if (data.message != 'dismiss') {
        this.appService.getAppointment(this.appReqUserData).then((response) => {
          this.appointmentList = response;
          this.appointmentDisable = false;
          this.stepType = "Appointment";
          console.log(this.appointmentList)
        },
          (err) => {
            console.log('Error getting appointments')
          }
        )

      }
      console.log(data)
    })

  }

  addToFavorite(adddata) {
    this.addFavoriteData.phone_number = window.localStorage.getItem('phone_number');
    this.addFavoriteData.ad_id = adddata._id;
    this.retrieveAds.addToFavoriteAds(this.addFavoriteData).then((response) => {
      // this.favColor = '#d9352f'
      adddata.fav = true;
    }, err => {

    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchResultsPage');
  }

}
