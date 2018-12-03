import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdcButtonModule, MdcTextFieldModule, MdcIconModule, MdcFabModule, MdcTopAppBarModule, MdcDrawerModule,
        MdcListModule, MdcIconButtonModule
} from '@angular-mdc/web';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdcButtonModule,
    MdcFabModule,
    MdcIconButtonModule,
    MdcTopAppBarModule,
    MdcTextFieldModule,
    MdcDrawerModule,
    MdcListModule,
    MdcIconModule,
    MdcFabModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
