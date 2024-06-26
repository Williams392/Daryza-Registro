import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";
import { Almacenero } from "../models/Almacenero";

@Injectable({
    providedIn: 'root'
  })
  export class AlmaceneroService {
  
    private urlBase = 'http://localhost:8080/gestion_app/almaceneros';
  
    constructor(private httpClient: HttpClient) { }
  
    obtenerAlmaceneros(): Observable<Almacenero[]> {
      return this.httpClient.get<Almacenero[]>(this.urlBase);
    }
  
    obtenerAlmaceneroPorId(id: number): Observable<Almacenero> {
      return this.httpClient.get<Almacenero>(`${this.urlBase}/${id}`);
    }
  
    agregarAlmacenero(almacenero: Almacenero): Observable<Almacenero> {
      return this.httpClient.post<Almacenero>(this.urlBase, almacenero);
    }
  
    actualizarAlmacenero(id: number, almacenero: Almacenero): Observable<Almacenero> {
      return this.httpClient.put<Almacenero>(`${this.urlBase}/${id}`, almacenero);
    }
  
    eliminarAlmacenero(id: number): Observable<any> {
      return this.httpClient.delete(`${this.urlBase}/${id}`);
    }
  }