import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";
import { Almacen } from "../models/Almacen";

@Injectable({
    providedIn: 'root'
  })
  export class AlmacenService {
  
    private urlBase = 'http://localhost:8080/gestion_app/almacenes';
  
    constructor(private httpClient: HttpClient) { }
  
    obtenerAlmacenes(): Observable<Almacen[]> {
      return this.httpClient.get<Almacen[]>(this.urlBase);
    }
  
    obtenerAlmacenPorId(id: number): Observable<Almacen> {
      return this.httpClient.get<Almacen>(`${this.urlBase}/${id}`);
    }
  
    agregarAlmacen(almacen: Almacen): Observable<Almacen> {
      return this.httpClient.post<Almacen>(this.urlBase, almacen);
    }
  
    actualizarAlmacen(id: number, almacen: Almacen): Observable<Almacen> {
      return this.httpClient.put<Almacen>(`${this.urlBase}/${id}`, almacen);
    }
  
    eliminarAlmacen(id: number): Observable<any> {
      return this.httpClient.delete(`${this.urlBase}/${id}`);
    }
}