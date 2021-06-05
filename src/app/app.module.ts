import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {HttpClientModule} from "@angular/common/http";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {httpInterceptProviders} from "./providers";
import {RequestsComponent} from "./components/requests/requests.component";

@NgModule({
  declarations: [AppComponent,RequestsComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [httpInterceptProviders,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  exports: [RequestsComponent],
})
export class AppModule {}
