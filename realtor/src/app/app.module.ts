import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginServiceProvider } from '../providers/login-service/login-service';
import { SignupServiceProvider } from '../providers/signup-service/signup-service';
import { RetrieveAdsProvider } from '../providers/retrieve-ads/retrieve-ads';
// import { VerifyPage } from '../pages/verify/verify';
import { DateTimeModalPageModule } from '../pages/date-time-modal/date-time-modal.module'
import { HttpClientModule } from '@angular/common/http';
import { AppointmentProvider } from '../providers/appointment/appointment';

//import {AllAppointmentsPage} from '../pages/all-appointments/all-appointments';
import { CallNumber } from '@ionic-native/call-number';
import { Constants } from '../providers/constants/constants';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    DateTimeModalPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginServiceProvider,
    SignupServiceProvider,
    RetrieveAdsProvider,
    AppointmentProvider,
    CallNumber,
    Constants
  ]
})
export class AppModule { }
