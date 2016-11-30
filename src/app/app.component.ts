import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { MainPage } from '../pages/main-page/main-page';
import { LoginPage } from '../pages/login-page/login-page';
import { SignupPage } from '../pages/signup-page/signup-page';
import { SearchProviderPage } from '../pages/search-provider-page/search-provider-page';
import { SearchSeekerPage } from '../pages/search-seeker-page/search-seeker-page';
import { CheckPage } from '../pages/check-page/check-page';

import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MainPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    firebase.initializeApp({
      apiKey: "AIzaSyBAre7IokE4gXeiyKZ7x3XulkV6y95lQL0",
      authDomain: "project-8437327679605247386.firebaseapp.com",
      databaseURL: "https://project-8437327679605247386.firebaseio.com",
      storageBucket: "project-8437327679605247386.appspot.com",
      messagingSenderId: "366172204131"
    });
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Main', component: MainPage },
      { title: 'Search for Service Providers', component: SearchProviderPage },
      { title: 'Search for Care Seekers', component: SearchSeekerPage },
      { title: 'Login', component: LoginPage},
      { title: 'Sign up', component: SignupPage},
      { title: 'Check', component: CheckPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (!user) {
    //     this.rootPage = LoginPage;
    //   }
    // });
    this.nav.setRoot(page.component);
  }
}
