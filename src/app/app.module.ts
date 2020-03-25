import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountComponent } from './components/account/account.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './components/account/filter/filter.component';
import { NavComponent } from './components/account/nav/nav.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'account', component: AccountComponent },
  { path: 'login', component: AuthComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    AuthComponent,
    FilterComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  exports: [RouterModule, NgxPaginationModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
