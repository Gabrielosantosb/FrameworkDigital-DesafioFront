import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManageLeadComponent} from "./manage-lead.component";
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {path: "", component: ManageLeadComponent}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageLeadRoutingModule { }
