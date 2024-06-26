import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../core/models/Producto';
import { HojaRequerimientosService } from '../../core/services/hoja_requirimiento.service';
import { Hoja_Requerimientos } from '../../core/models/Hoja_Requerimientos';

@Component({
  selector: 'app-control-calidad',
  templateUrl: './control-calidad.component.html',
  styleUrl: './control-calidad.component.css'
})
export class ControlCalidadComponent implements OnInit {

  productos: Producto[] = [];
  selectedProduct: Producto | null = null;
  productosRegistrados: any[] = [];
  cantidadExistencia: number = 0;
  calidadP: string = 'Aceptable';

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      productos => {
        this.productos = productos;
      },
      error => {
        console.error('Error obteniendo productos:', error);
      }
    );
  }

  selectProduct(producto: Producto): void {
    this.selectedProduct = producto;
    this.cantidadExistencia = producto.cantidadExistencia; // Mostrar cantidad existente del producto
    this.calidadP = producto.calidadP || 'Aceptable'; // Mostrar calidad del producto o valor por defecto
  }

  registrarProducto(): void {
    if (this.selectedProduct) {
      const productoRegistrado = {
        ...this.selectedProduct,
        cantidad: this.cantidadExistencia,
        calidad: this.calidadP
      };
      this.productosRegistrados.push(productoRegistrado);
      // Resetear los campos después de registrar
      this.selectedProduct = null;
      this.cantidadExistencia = 0;
      this.calidadP = 'Aceptable';
    }
  }

  cancelar(): void {
    this.selectedProduct = null;
    this.cantidadExistencia = 0;
    this.calidadP = 'Aceptable';
  }
}