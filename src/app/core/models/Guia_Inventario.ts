import { Almacen } from "./Almacen";
import { Almacenero } from "./Almacenero";

export class Guia_Inventario {
    num_GuiaInv: number;
    descripcionG: string;
    tipoProd: string;
    cantProdActual: number;
    num_Almacen: Almacen;
}