import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";
import { Guia_Productos } from "../models/Guia_Productos";


@Injectable({
    providedIn: 'root'
  })
  export class GuiaProductosService {
  
    private urlBase = 'http://localhost:8080/gestion_app/guia_productos';
  
    constructor(private httpClient: HttpClient) { }
  
    obtenerGuiasProductos(): Observable<Guia_Productos[]> {
      return this.httpClient.get<Guia_Productos[]>(this.urlBase);
    }
  
    obtenerGuiaProductosPorId(id: number): Observable<Guia_Productos> {
      return this.httpClient.get<Guia_Productos>(`${this.urlBase}/${id}`);
    }
  
    agregarGuiaProductos(guiaProductos: Guia_Productos): Observable<Guia_Productos> {
      return this.httpClient.post<Guia_Productos>(this.urlBase, guiaProductos);
    }
  
    actualizarGuiaProductos(id: number, guiaProductos: Guia_Productos): Observable<Guia_Productos> {
      return this.httpClient.put<Guia_Productos>(`${this.urlBase}/${id}`, guiaProductos);
    }
  
    eliminarGuiaProductos(id: number): Observable<any> {
      return this.httpClient.delete(`${this.urlBase}/${id}`);
    }
}