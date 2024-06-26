import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";
import { Producto } from "../models/Producto";


@Injectable({
    providedIn: 'root'
  })
  export class ProductoService {
  
    private urlBase = 'http://localhost:8080/gestion_app/productos';
  
    constructor(private httpClient: HttpClient) { }
  
    obtenerProductos(): Observable<Producto[]> {
      return this.httpClient.get<Producto[]>(this.urlBase);
    }
  
    obtenerProductoPorId(id: number): Observable<Producto> {
      return this.httpClient.get<Producto>(`${this.urlBase}/${id}`);
    }
  
    agregarProducto(producto: Producto): Observable<Producto> {
      return this.httpClient.post<Producto>(this.urlBase, producto);
    }
  
    actualizarProducto(id: number, producto: Producto): Observable<Producto> {
      return this.httpClient.put<Producto>(`${this.urlBase}/${id}`, producto);
    }
  
    eliminarProducto(id: number): Observable<any> {
      return this.httpClient.delete(`${this.urlBase}/${id}`);
    }
}