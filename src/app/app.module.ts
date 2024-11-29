import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NZ_DATE_LOCALE, NZ_I18N, pt_BR} from 'ng-zorro-antd/i18n';
import { ptBR } from "date-fns/locale";
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageLeadComponent } from './pages/manage-lead/manage-lead.component';
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzInputModule} from "ng-zorro-antd/input";
import {MessageService} from "./shared/utils/messageService";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzSpinModule} from "ng-zorro-antd/spin";

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
    NzPageHeaderModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    NzDividerModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzSpinModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: pt_BR },
    { provide: NZ_DATE_LOCALE, useValue: ptBR },
    { provide: LOCALE_ID, useValue: "pt-BR" },
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
