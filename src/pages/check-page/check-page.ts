import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login-page/login-page';
import { ToastController } from 'ionic-angular';
import firebase from 'firebase';

/*
  Generated class for the CheckPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-check-page',
  templateUrl: 'check-page.html'
})
export class CheckPage {

  checkinValue: any;
  checkoutValue: any;
  userId: any;

  constructor(public navCtrl: NavController, public authData: AuthData, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('Hello CheckPage Page');
    if(firebase.auth().currentUser.uid !== null){
      this.userId = firebase.auth().currentUser.uid;
      console.log(this.userId);
    }
        firebase.database().ref('/userProfile/' + this.userId).once('value').then((snapshot)=>{
          console.log('checkintime=====' + snapshot.val().checkinTime);
          if(snapshot.val().checkinTime !== 'none'){
            this.checkinValue = snapshot.val().checkinTime;
          }
        });
  }

  checkIn(){
    // Toast.show("Checkin Time: " + new Date(), '5000', 'center').subscribe(
    //   toast => {
    //     console.log(toast);
    //   }
    // );
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authData.checkInTime((new Date()).toString(), user);
        firebase.database().ref('/userProfile/' + user.uid).on('value',(snapshot)=>{
          console.log('checkintime11111=====' + snapshot.val().checkinTime);
          if(snapshot.val().checkinTime !== 'none'){
            this.checkinValue = snapshot.val().checkinTime;
            this.checkoutValue = '';
          }
        });
      }
    });

    console.log("add check in time");
  }

  chechOut(){
    // Toast.show("Checkout Time: " + new Date(), '5000', 'center').subscribe(
    //   toast => {
    //     console.log(toast);
    //   }
    // );
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authData.checkOutTime((new Date()).toString(), user);
        firebase.database().ref('/userProfile/' + user.uid).on('value',(snapshot)=>{
          console.log(snapshot.val().checkoutTime);
          if(snapshot.val().checkoutTime !== 'none'){
            this.checkoutValue =  snapshot.val().checkoutTime;
          }
        });
      }
    });
    console.log("add check out time");
  }

  logOut(){
    this.authData.logoutUser().then(() => {
      this.navCtrl.setRoot(LoginPage);
    });
  }

}
