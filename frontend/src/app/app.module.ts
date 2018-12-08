import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListSpaceshipComponent } from './list-spaceship/list-spaceship.component';
import { ListMothershipComponent } from './list-mothership/list-mothership.component';
import { ListPassengerComponent } from './list-passenger/list-passenger.component';
import {Routes, RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './material.module';
import { DialogModule } from './dialog-module';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
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
  ],
  imports: [
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
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
