import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionProductoComponent } from './recepcion-producto/recepcion-producto.component';
import { ControlCalidadComponent } from './control-calidad/control-calidad.component';
import { GuiaInventarioComponent } from './guia-inventario/guia-inventario.component';
import { GuiaProductoComponent } from './guia-producto/guia-producto.component';
import { RegistroInventarioComponent } from './registro-inventario/registro-inventario.component';

const routes: Routes = [
  { path: '', redirectTo: 'control_calidad', pathMatch: 'full' },
  { path: 'control_calidad', component: ControlCalidadComponent },
  { path: 'recepcion_producto', component: RecepcionProductoComponent },

  { path: 'guia_inventario', component: GuiaInventarioComponent },
  { path: 'guia_producto', component: GuiaProductoComponent },
  { path: 'registro_inventaio', component: RegistroInventarioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlmacenRoutingModule { }

