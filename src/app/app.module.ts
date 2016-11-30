import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { MainPage } from '../pages/main-page/main-page';
import { LoginPage } from '../pages/login-page/login-page';
import { SignupPage } from '../pages/signup-page/signup-page';
import { SearchProviderPage } from '../pages/search-provider-page/search-provider-page';
import { SearchSeekerPage } from '../pages/search-seeker-page/search-seeker-page';
import { CheckPage } from '../pages/check-page/check-page';

// Import providers
import { AuthData } from '../providers/auth-data';


@NgModule({
  declarations: [
    MyApp,
    MainPage,
    SearchProviderPage,
    SearchSeekerPage,
    LoginPage,
    SignupPage,
    CheckPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPage,
    SearchProviderPage,
    SearchSeekerPage,
    LoginPage,
    SignupPage,
    CheckPage
  ],
  providers: [
    AuthData
  ]
})
export class AppModule {}
