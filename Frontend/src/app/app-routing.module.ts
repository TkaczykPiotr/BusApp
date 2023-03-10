import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { ConnectionComponent } from './connection/connection.component';
import { TicketComponent } from './ticket/ticket.component';
import { AccountComponent } from './account/account.component';
import { GeneratedpdfComponent } from './generatedpdf/generatedpdf.component';

const routes: Routes = [
     {
        path : 'Home',
        component: HomeComponent
      },
      {
        path : 'SignIn',
        component: LoginComponent
      },
      {
        path : 'SignUp',
        component: RegistrationComponent
      },
      {
        path : 'Connection',
        component: ConnectionComponent
      },
      {
        path : 'Ticket',
        component: TicketComponent
      },
      {
        path : 'Account',
        component: AccountComponent
      },
      {
        path : 'Generate',
        component: GeneratedpdfComponent
      },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
