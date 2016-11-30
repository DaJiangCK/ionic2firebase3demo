import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the SearchSeekerPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search-seeker-page',
  templateUrl: 'search-seeker-page.html'
})
export class SearchSeekerPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello SearchSeekerPage Page');
  }

}
