import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { ToastController } from 'ionic-angular';


@Injectable()
export class AuthData {
  // Here we declare the variables we'll be using.
  public fireAuth: any;
  public userProfile: any;
  // public userId: any;
  // public check: any;
  // public checkOut: any;

  constructor(public toastCtrl: ToastController) {
    this.fireAuth = firebase.auth(); // We are creating an auth reference.
    
    // This declares a database reference for the userProfile/ node.
    this.userProfile = firebase.database().ref('/userProfile');
    // this.check = firebase.database().ref('/userProfile/check');
    // this.checkOut = firebase.database().ref('/userProfile/checkOut');
    // this.userId = firebase.auth().currentUser.uid;
  }

  /**
   * [loginUser We'll take an email and password and log the user into the firebase app]
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  loginUser(email: string, password: string): any {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  /**
   * [signupUser description]
   * This function will take the user's email and password and create a new account on the Firebase app, once it does
   * it's going to log the user in and create a node on userProfile/uid with the user's email address, you can use
   * that node to store the profile information.
   * @param  {string} email    [User's email address]
   * @param  {string} password [User's password]
   */
  signupUser(email: string, password: string): any {
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      this.userProfile.child(newUser.uid).set({
        email: email,
        checkinTime: 'none',
        checkoutTime: 'none'
      });
    });
  }

  /**
   * [resetPassword description]
   * This function will take the user's email address and send a password reset link, then Firebase will handle the
   * email reset part, you won't have to do anything else.
   *
   * @param  {string} email    [User's email address]
   */
  resetPassword(email: string): any {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  /**
   * This function doesn't take any params, it just logs the current user out of the app.
   */
  logoutUser(): any {
    return this.fireAuth.signOut();
  }

  checkInTime(checkinTime: string, user: any): any{
    var checkinValue: any;
    // console.log('value =====' + firebase.database().ref('/userProfile/' + user.uid).once('value'));
    firebase.database().ref('/userProfile/' + user.uid).once('value').then((snapshot)=>{
      // console.log(snapshot.val().checkinTime);
      checkinValue = snapshot.val().checkinTime;
      if(snapshot.val().checkinTime === 'none'){
        return this.userProfile.child(user.uid).update({
          checkinTime: checkinTime,
          checkoutTime: 'none'
        });
      }else{
        console.log("already checked in");
        this.presentToast('already checked in');

      }
    });
  }


  checkOutTime(checkoutTime: string, user: any): any{
    var checkoutValue: any;
    firebase.database().ref('/userProfile/' + user.uid).once('value').then((snapshot)=>{
      checkoutValue = snapshot.val().checkoutTime;
      if(snapshot.val().checkinTime !== 'none'){
        return this.userProfile.child(user.uid).update({
          checkoutTime: checkoutTime,
          checkinTime: 'none'
        });
      }else{
        console.log("already checked out");
        this.presentToast('already checked out');
      }
    });
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500
    });
    toast.present();
  }


}
