import { Component } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms'
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { SignupServiceProvider } from '../../providers/signup-service/signup-service';
import { StatusBar } from '@ionic-native/status-bar';
//import { VerifyPage } from '../verify/verify';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  signUpForm: FormGroup;
  // user = {
  //   first_name: '',
  //   last_name: '',
  //   phone_number: '',
  //   country_code: '94',
  //   token: '',
  //   password: ''
  // }
  constructor(public navCtrl: NavController, public navParams: NavParams, public signupService: SignupServiceProvider, private formBuilder:FormBuilder,private alertCtrl:AlertController, public statusBar:StatusBar) {
    this.signUpForm = this.formBuilder.group({
        first_name: ['',Validators.required],
        last_name: ['',Validators.required],
        phone_number: ['',Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
        country_code: '94',
        token: '',
        password: ['',Validators.compose([Validators.required,Validators.minLength(6)])]
      
    })
  }
  signup(user) {
    //this.navCtrl.push(VerifyPage,this.user);
    this.signupService.userSignup(user).then((response) => {
      console.log('success');
      window.localStorage.setItem('phone_number', user.phone_number);
      this.navCtrl.push('VerifyPage', user);

      //console.log(response);
    }, (err) => {
      let alert = this.alertCtrl.create({
        title:'Phone Number',
        subTitle:err.error.message,
        buttons:['Dismiss']
      })
      alert.present();
      console.log(err)
    })
  }
  ionViewWillEnter() {
    this.statusBar.styleDefault();
  }
  // static passwordsMatch(cg: FormGroup): {[err: string]: any} {
  //   let pwd1 = cg.get('password');
  //   let pwd2 = cg.get('password_conf');
  //   let rv: {[error: string]: any} = {};
  //   if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
  //     rv['passwordMismatch'] = true;
  //   }else{
  //     rv['passwordMismatch'] =false;
  //   }
  //   console.log(rv)
  //   return rv;

  // }

}
