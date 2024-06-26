import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";
import { Guia_Inventario } from "../models/Guia_Inventario";
import { Producto } from "../models/Producto";


@Injectable({
    providedIn: 'root'
  })
  export class GuiaInventarioService {
  
    private urlBase = 'http://localhost:8080/gestion_app/guia_inventario';
  
    constructor(private httpClient: HttpClient) { }
  
    obtenerGuiasInventario(): Observable<Guia_Inventario[]> {
      return this.httpClient.get<Guia_Inventario[]>(this.urlBase);
    }
  
    obtenerGuiaInventarioPorId(id: number): Observable<Guia_Inventario> {
      return this.httpClient.get<Guia_Inventario>(`${this.urlBase}/${id}`);
    }
  
    agregarGuiaInventario(guiaInventario: Guia_Inventario): Observable<Guia_Inventario> {
      return this.httpClient.post<Guia_Inventario>(this.urlBase, guiaInventario);
    }
  
    actualizarGuiaInventario(id: number, guiaInventario: Guia_Inventario): Observable<Guia_Inventario> {
      return this.httpClient.put<Guia_Inventario>(`${this.urlBase}/${id}`, guiaInventario);
    }
  
    eliminarGuiaInventario(id: number): Observable<any> {
      return this.httpClient.delete(`${this.urlBase}/${id}`);
    }
    

}