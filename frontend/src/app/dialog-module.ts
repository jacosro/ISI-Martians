import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppMaterialModule } from './material.module';
import { PassengerBoardDialog } from "./views/passenger/board-passenger.dialog";
import { PassengerCreateDialog } from "./views/passenger/create-passenger.dialog";
import { PassengerLandDialog } from "./views/passenger/land-passenger.dialog";
import { MothershipCreateDialog } from "./views/mothership/create-mothership.dialog";
import { SpaceshipCreateDialog } from "./views/spaceship/create-spaceship.dialog";
import { SpaceshipInspectionDialog } from "./views/spaceship/inspection-spaceship.dialog";

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
    PassengerLandDialog,
    SpaceshipInspectionDialog
  ],
  entryComponents: [
    MothershipCreateDialog,
    SpaceshipCreateDialog,
    PassengerCreateDialog,
    PassengerBoardDialog,
    PassengerLandDialog,
    SpaceshipInspectionDialog
  ]
})
export class DialogModule { }
