import { Almacen } from "./Almacen";
import { Producto } from "./Producto";

export class Guia_Inventario {
    num_GuiaInv: number;
    descripcionG: string;
    tipoProd: string;
    cantProdActual: number;
    num_Almacen: Almacen;
    
    codigoProd: Producto;  // Referencia al producto

}