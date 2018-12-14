import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";
import { AppMaterialModule } from './material.module';

import {
  MothershipCreateDialog
} from './views/mothership/list-mothership.component';

import {
  SpaceshipCreateDialog
} from './views/spaceship/list-spaceship.component';

import {
  PassengerBoardDialog,
  PassengerCreateDialog, PassengerLandDialog
} from './views/passenger/list-passenger.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    BrowserModule
  ],
  declarations: [
    MothershipCreateDialog,
    SpaceshipCreateDialog,
    PassengerCreateDialog,
    PassengerBoardDialog,
    PassengerLandDialog
  ],
  entryComponents: [
    MothershipCreateDialog,
    SpaceshipCreateDialog,
    PassengerCreateDialog,
    PassengerBoardDialog,
    PassengerLandDialog
  ]
})
export class DialogModule { }
