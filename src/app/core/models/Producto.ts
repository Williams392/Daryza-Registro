import { Almacen } from "./Almacen";
import { Almacenero } from "./Almacenero";
import { Guia_Inventario } from "./Guia_Inventario";
import { Guia_Productos } from "./Guia_Productos";
import { Hoja_Requerimientos } from "./Hoja_Requerimientos";

export class Producto {
    codigoProd: number;
    nombreProd: string;
    marca: string;
    descripcion: string;
    calidadP: string;
    cantidadExistencia: number;
    precioProd: number;
    codRequer: Hoja_Requerimientos;
    almacenero: Almacenero;
    num_GuiaInv: Guia_Inventario; 
    numAlmacen: Almacen;
    id_guiaProd: Guia_Productos;
}
