import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
// import { CountryPickerModule } from 'ngx-country-picker';

// @IonicPage()
@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    // CountryPickerModule.forRoot()
  ],
  exports:[
      HomePage
  ]
})
export class HomePageModule {}
