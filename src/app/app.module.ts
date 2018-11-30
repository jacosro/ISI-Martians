import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule} from '@angular/material';



import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { MothershipComponent } from './mothership/mothership.component';
import { AirshipComponent } from './airship/airship.component';

const appRoutes: Routes = [
  {path: '', component: MothershipComponent},
  {path: 'mothership', component: MothershipComponent},
  {path: 'airship', component: AirshipComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MothershipComponent,
    AirshipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes, {
        useHash: true
      }
    ),
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
