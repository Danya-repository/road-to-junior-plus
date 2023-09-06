import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthorizeModule} from "./authorize/authorize.module";
import {LoginModule} from "./login/login.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthorizeModule,
    AppRoutingModule,
    LoginModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
