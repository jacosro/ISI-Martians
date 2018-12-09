import { NgModule } from '@angular/core';
// @ts-ignore
import {
  MdcButtonModule,
  MdcCheckboxModule,
  MdcDialogModule,
  MdcIconModule,
  MdcFabModule,
  MdcTopAppBarModule,
  MdcDrawerModule,
  MdcRadioModule,
  MdcListModule,
  MdcTextFieldModule,
  MdcIconButtonModule,
  MdcElevationModule,
  MdcSelectModule,
  MdcSnackbarModule,
  MdcFormFieldModule
} from '@angular-mdc/web';

@NgModule({
  exports: [
    MdcButtonModule,
    MdcCheckboxModule,
    MdcDialogModule,
    MdcIconModule,
    MdcFabModule,
    MdcTopAppBarModule,
    MdcDrawerModule,
    MdcRadioModule,
    MdcListModule,
    MdcTextFieldModule,
    MdcIconButtonModule,
    MdcElevationModule,
    MdcSelectModule,
    MdcSnackbarModule,
    MdcFormFieldModule
  ]
})
export class AppMaterialModule { }
