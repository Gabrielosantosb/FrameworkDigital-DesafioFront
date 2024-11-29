import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NZ_DATE_LOCALE, NZ_I18N, pt_BR} from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageLeadComponent } from './pages/manage-lead/manage-lead.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ManageLeadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzPageHeaderModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
    { provide: NZ_DATE_LOCALE, useValue: pt_BR },
    { provide: LOCALE_ID, useValue: "pt-BR" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
