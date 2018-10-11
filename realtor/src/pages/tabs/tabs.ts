import {Component } from '@angular/core';
import {IonicPage} from 'ionic-angular'
// import { MyProfilePage } from '../my-profile/my-profile';
// import { FavoritesPage } from '../favorites/favorites';
// import { HomePage } from '../home/home';
// import { AllAppointmentsPage } from '../all-appointments/all-appointments'



@IonicPage()


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'MyProfilePage';
  tab3Root = 'FavoritesPage';
  tab4Root = 'AllAppointmentsPage';

  constructor() {

  }
}
