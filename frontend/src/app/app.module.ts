import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdcButtonModule, MdcTextFieldModule, MdcIconModule, MdcFabModule, MdcTopAppBarModule, MdcDrawerModule,
        MdcListModule, MdcIconButtonModule, MdcElevationModule
} from '@angular-mdc/web';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePassengerComponent } from './create-passenger/create-passenger.component';
import { CreateAirshipComponent } from './create-airship/create-airship.component';
import { CreateMothershipComponent } from './create-mothership/create-mothership.component';
import {Routes, RouterModule} from '@angular/router';


const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'create-passenger', component: CreatePassengerComponent },
  { path: 'create-mothership', component: CreateMothershipComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    CreatePassengerComponent,
    CreateAirshipComponent,
    CreateMothershipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes, {
        useHash: true
      }
    ),
    MdcButtonModule,
    MdcFabModule,
    MdcIconButtonModule,
    MdcElevationModule,
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
