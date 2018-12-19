import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { MatSortModule } from "@angular/material";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListSpaceshipComponent } from './views/spaceship/list-spaceship.component';
import { ListMothershipComponent } from './views/mothership/list-mothership.component';
import { ListPassengerComponent } from './views/passenger/list-passenger.component';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './material.module';
import { DialogModule } from './dialog-module';
import { SpaceshipService } from "./services/spaceshipService";
import { MothershipService } from "./services/mothershipService";
import { PassengerService } from './services/passengerService';
import { CommonModule } from "@angular/common";
import { MainViewComponent } from './main-view/main-view.component';
import { ListInspectionComponent } from './views/inspection/list-inspection.component';
import {InspectionService} from "./services/inspectionService";

const appRoutes: Routes = [
  { path: '', component: MainViewComponent },
  { path: 'inspection', component: ListInspectionComponent },
  { path: 'passenger', component: ListPassengerComponent },
  { path: 'mothership', component: ListMothershipComponent },
  { path: 'spaceship', component: ListSpaceshipComponent }
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
    ListInspectionComponent,
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
    HttpClientModule,
    MatSortModule
  ],
  providers: [
    MothershipService,
    PassengerService,
    SpaceshipService,
    InspectionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
