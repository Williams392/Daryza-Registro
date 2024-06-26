import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";
import { Hoja_Requerimientos } from "../models/Hoja_Requerimientos";


@Injectable({
    providedIn: 'root'
  })
  export class HojaRequerimientosService {
  
    private urlBase = 'http://localhost:8080/gestion_app/hojas_requerimientos';
  
    constructor(private httpClient: HttpClient) { }
  
    obtenerHojasRequerimientos(): Observable<Hoja_Requerimientos[]> {
      return this.httpClient.get<Hoja_Requerimientos[]>(this.urlBase);
    }
  
    obtenerHojaRequerimientosPorId(id: number): Observable<Hoja_Requerimientos> {
      return this.httpClient.get<Hoja_Requerimientos>(`${this.urlBase}/${id}`);
    }
  
    agregarHojaRequerimientos(hojaRequerimientos: Hoja_Requerimientos): Observable<Hoja_Requerimientos> {
      return this.httpClient.post<Hoja_Requerimientos>(this.urlBase, hojaRequerimientos);
    }
  
    actualizarHojaRequerimientos(id: number, hojaRequerimientos: Hoja_Requerimientos): Observable<Hoja_Requerimientos> {
      return this.httpClient.put<Hoja_Requerimientos>(`${this.urlBase}/${id}`, hojaRequerimientos);
    }
  
    eliminarHojaRequerimientos(id: number): Observable<any> {
      return this.httpClient.delete(`${this.urlBase}/${id}`);
    }
}