import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignupServiceProvider } from '../../providers/signup-service/signup-service';
//import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the VerifyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verify',
  templateUrl: 'verify.html',
})
export class VerifyPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public signupService: SignupServiceProvider) {
  }
  invalidCode:boolean=false;
  user: any = {
    first_name: this.navParams.get('first_name'),
    last_name: this.navParams.get('last_name'),
    phone_number: this.navParams.get('phone_number'),
    country_code: '94',
    token: '',
    password: this.navParams.get('password')
  }
  verify() {
    //this.navCtrl.push(TabsPage,this.user)
    this.signupService.userVerify(this.user).then((response) => {
      console.log('success')
      this.navCtrl.push('TabsPage', this.user)
    }, (err) => {
      this.invalidCode=true;
      console.log(err);
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyPage');
  }

}
