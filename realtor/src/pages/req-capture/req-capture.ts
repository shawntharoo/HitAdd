import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
// import {SearchResultsPage} from '../search-results/search-results';
import { CITIES } from '../../providers/constants/constants';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the ReqCapturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-req-capture',
  templateUrl: 'req-capture.html',
})
export class ReqCapturePage {
  showList: boolean = false;
  cities: Array<string>
  request = {
    location: '',
    noOfRooms: 1,
    priceRange: {
      lower: '500',
      upper: '900'
    },
    category: 'House',
    areaRange: {
      lower: '500',
      upper: '900'
    },
    showLastSeven: false,
    type: 'Buy'

  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public statusBar:StatusBar,public platform: Platform) {
    this.setCities();
    this.platform= platform;
    this.platform.ready().then( () => {
      this.statusBar.styleDefault()
    });
    this.statusBar.styleDefault();
  }
  gotoSearchResults() {
    this.navCtrl.push('SearchResultsPage', this.request);
  }
  setCities() {
    this.cities = CITIES.cities;
    //console.log(this.cities[1]);
  }
  filterItems(ev: any) {
    this.setCities();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.cities = this.cities.filter(function (item) {
        return item.toLowerCase().includes(val.toLowerCase());
      });
      this.showList = true;
    }
    else {
      this.showList = false;
    }
  }
  hideList(city) {
    this.showList = false;
    this.request.location = city;
  }
  // ngOnInit(){
  //   this.setCities()
  // }
  ionViewDidLoad() {
    this.setCities();
    console.log('ionViewDidLoad ReqCapturePage');
  }

}
