import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ListSpaceshipComponent, SpaceshipCreateDialog} from './list-spaceship/list-spaceship.component';
import { ListMothershipComponent } from './list-mothership/list-mothership.component';
import { ListPassengerComponent } from './list-passenger/list-passenger.component';
import {Routes, RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './material.module';
import { DialogModule } from './dialog-module';
import { SpaceshipService } from "./services/spaceshipService";
import { MothershipService } from "./services/mothershipService";
import { PassengerService } from './services/passengerService';
import {CommonModule} from "@angular/common";
import { MainViewComponent } from './main-view/main-view.component';

const appRoutes: Routes = [
  { path: 'main-view', component: MainViewComponent },
  { path: 'list-passenger', component: ListPassengerComponent },
  { path: 'list-mothership', component: ListMothershipComponent },
  { path: 'list-spaceship', component: ListSpaceshipComponent }
];
@NgModule({
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    ListSpaceshipComponent,
    ListMothershipComponent,
    ListPassengerComponent,
    MainViewComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes, {
        useHash: true
      }
    ),
    AppMaterialModule,
    MatTableModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    MothershipService,
    PassengerService,
    SpaceshipService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
