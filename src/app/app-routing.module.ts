import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'almacen', pathMatch: 'full' },
  { path: 'almacen', loadChildren: () => import('./almacen/almacen.module').then(m => m.AlmacenModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
