import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule } from "@angular/material/form-field";
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {FormsModule} from '@angular/forms';
import {MatPaginatorModule } from "@angular/material/paginator";
import {MatTableModule } from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { QRCodeModule } from 'angularx-qrcode';


import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from '../environments/environment';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { ConnectionComponent } from './connection/connection.component';
import { TicketComponent } from './ticket/ticket.component';
import { AccountComponent } from './account/account.component';
import { DialogPersonalComponent } from './dialog-personal/dialog-personal.component';
import { DialogMonthlyComponent } from './dialog-monthly/dialog-monthly.component';
import { GeneratedpdfComponent } from './generatedpdf/generatedpdf.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ConnectionComponent,
    TicketComponent,
    AccountComponent,
    DialogPersonalComponent,
    DialogMonthlyComponent,
    GeneratedpdfComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDividerModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    MatListModule,
    QRCodeModule


  ],
  providers: [
    {
      provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher

    }

  ],
  entryComponents:[MatDialogModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
