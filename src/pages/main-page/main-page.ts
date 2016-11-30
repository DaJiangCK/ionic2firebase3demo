import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchProviderPage } from '../search-provider-page/search-provider-page';

/*
  Generated class for the MainPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-main-page',
  templateUrl: 'main-page.html'
})
export class MainPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello MainPage Page');
  }

  onSearch() {
    this.navCtrl.push(SearchProviderPage);
  }
}
