import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MdcButtonModule, MdcTextFieldModule, MdcIconModule, MdcFabModule, MdcTopAppBarModule, MdcDrawerModule,
        MdcListModule, MdcIconButtonModule, MdcElevationModule, MdcFormFieldModule, MdcSelectModule} from '@angular-mdc/web';
import { MatTableModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreatePassengerComponent } from './create-passenger/create-passenger.component';
import { CreateMothershipComponent } from './create-mothership/create-mothership.component';
import { CreateSpaceshipComponent } from './create-spaceship/create-spaceship.component';
import { ListSpaceshipComponent } from './list-spaceship/list-spaceship.component';
import { ListMothershipComponent } from './list-mothership/list-mothership.component';
import { ListPassengerComponent } from './list-passenger/list-passenger.component';
import {Routes, RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {PassengerService} from './services/passengerService';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'create-passenger', component: CreatePassengerComponent },
  { path: 'create-mothership', component: CreateMothershipComponent },
  { path: 'create-spaceship', component: CreateSpaceshipComponent },
  { path: 'list-passenger', component: ListPassengerComponent },
  { path: 'list-mothership', component: ListMothershipComponent },
  { path: 'list-spaceship', component: ListSpaceshipComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    CreatePassengerComponent,
    CreateSpaceshipComponent,
    CreateMothershipComponent,
    ListSpaceshipComponent,
    ListMothershipComponent,
    ListPassengerComponent,
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
    MdcDrawerModule,
    MdcElevationModule,
    MdcFabModule,
    MdcFormFieldModule,
    MdcIconModule,
    MdcIconButtonModule,
    MdcListModule,
    MdcSelectModule,
    MdcTextFieldModule,
    MdcTopAppBarModule,
    MatTableModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [PassengerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
