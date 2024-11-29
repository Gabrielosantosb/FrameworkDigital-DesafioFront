import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "", pathMatch: "full", redirectTo: "gerenciar-leads"},
  {
    path: 'gerenciar-leads',
    loadChildren: () => import('./pages/manage-lead/manage-lead.module').then(m => m.ManageLeadModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
