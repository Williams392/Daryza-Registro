import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecepcionProductoComponent } from './recepcion-producto/recepcion-producto.component';
import { AlmacenRoutingModule } from './almacen-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ControlCalidadComponent } from './control-calidad/control-calidad.component';
import { FormsModule } from '@angular/forms';
import { GuiaInventarioComponent } from './guia-inventario/guia-inventario.component';
import { GuiaProductoComponent } from './guia-producto/guia-producto.component';
import { RegistroInventarioComponent } from './registro-inventario/registro-inventario.component';


@NgModule({
  declarations: [
    RecepcionProductoComponent,
    ControlCalidadComponent,
    GuiaInventarioComponent,
    GuiaProductoComponent,
    RegistroInventarioComponent
  ],
  imports: [
    CommonModule,
    AlmacenRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class AlmacenModule { }
