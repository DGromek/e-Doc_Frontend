import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './guest/login/login.component';
import {NavbarComponent} from './core/navbar/navbar.component';
import {FooterComponent} from './core/footer/footer.component';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {RegisterComponent} from './guest/register/register.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PatientService} from './services/patient.service';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import {PatientDashboardComponent} from './patient/patient-dashboard/patient-dashboard.component';
import {HomeComponent} from './guest/home/home.component';
import localePl from '@angular/common/locales/pl';
import {registerLocaleData} from '@angular/common';
import { ClinicsBrowserComponent } from './patient/clinics-browser/clinics-browser.component';
import { ClinicViewComponent } from './patient/clinic-view/clinic-view.component';
import { AppointmentBookingModalComponent } from './patient/appointment-booking-modal/appointment-booking-modal.component';

registerLocaleData(localePl);

const appRoutes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: PatientDashboardComponent},
  {path: 'home', component: HomeComponent},
  {path: 'clinics', component: ClinicsBrowserComponent},
  {path: 'clinics/:id', component: ClinicViewComponent},
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    RegisterComponent,
    PatientDashboardComponent,
    HomeComponent,
    ClinicsBrowserComponent,
    ClinicViewComponent,
    AppointmentBookingModalComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [PatientService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }, {provide: LOCALE_ID, useValue: 'pl'}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
