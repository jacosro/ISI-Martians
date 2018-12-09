import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from './material.module';

import {
  MothershipCreateDialog
} from './list-mothership/list-mothership.component';

import {
  SpaceshipCreateDialog
} from './list-spaceship/list-spaceship.component';

import {
  PassengerCreateDialog
} from './list-passenger/list-passenger.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ],
  declarations: [
    MothershipCreateDialog,
    SpaceshipCreateDialog,
    PassengerCreateDialog
  ],
  entryComponents: [
    MothershipCreateDialog,
    SpaceshipCreateDialog,
    PassengerCreateDialog
  ]
})
export class DialogModule { }
