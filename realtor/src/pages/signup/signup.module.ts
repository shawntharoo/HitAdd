import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';
// import { CountryPickerModule } from 'ngx-country-picker';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    // CountryPickerModule.forRoot()
  ],
})
export class SignupPageModule {}
