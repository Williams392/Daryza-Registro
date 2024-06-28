import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../core/services/producto.service';
import { Producto } from '../../core/models/Producto';
import { HojaRequerimientosService } from '../../core/services/hoja_requirimiento.service';
import { Hoja_Requerimientos } from '../../core/models/Hoja_Requerimientos';
import { AlmacenService } from '../../core/services/almacen.service';
import { Almacen } from '../../core/models/Almacen';

@Component({
  selector: 'app-control-calidad',
  templateUrl: './control-calidad.component.html',
  styleUrl: './control-calidad.component.css'
})
export class ControlCalidadComponent implements OnInit {

  productosRegistrados: Producto[] = [];
  productos: Producto[] = [];
  selectedProduct: Producto = new Producto(); // Inicialización con un objeto Producto vacío
  cantidadExistencia: number = 0;
  Hojas_Requerimiento: Hoja_Requerimientos[] = [];

  constructor(
    private productoService: ProductoService,
    private hojaRequerimientoService: HojaRequerimientosService
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerHojasRequerimientos();
  }

  obtenerHojasRequerimientos(): void {
    this.hojaRequerimientoService.obtenerHojasRequerimientos().subscribe(
      (Hojas_Requerimiento: Hoja_Requerimientos[]) => {
        this.Hojas_Requerimiento = Hojas_Requerimiento;
      },
      (error) => {
        console.error('Error al obtener hojas de requerimientos:', error);
      }
    );
  }

  obtenerProductos(): void {
    this.productoService.obtenerProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
      },
      (error) => {
        console.error('Error al obtener productos:', error);
      }
    );
  }

  selectProduct(producto: Producto): void {
    this.selectedProduct = { ...producto }; // Copiar el producto seleccionado para evitar cambios directos
    this.cantidadExistencia = producto.cantidadExistencia || 0;

    // Asignar la Calidad seleccionada
    if (producto.codRequer) {
      this.selectedProduct.calidadP = producto.codRequer.calidadProd;
    }
  }

  registrarProducto(): void {
    if (this.selectedProduct && this.selectedProduct.codigoProd) {
      // Asignación de la calidad (calidadP)
      const requerimientoSeleccionado = this.Hojas_Requerimiento.find(requerimiento => requerimiento.calidadProd === this.selectedProduct.calidadP);
      if (requerimientoSeleccionado) {
        this.selectedProduct.calidadP = requerimientoSeleccionado.calidadProd;
      }

      // Actualización del producto en la base de datos
      this.productoService.actualizarProducto(this.selectedProduct.codigoProd, this.selectedProduct).subscribe(
        (productoActualizado: Producto) => {
          const index = this.productosRegistrados.findIndex(prod => prod.codigoProd === productoActualizado.codigoProd);
          if (index !== -1) {
            this.productosRegistrados[index] = { ...productoActualizado };
          } else {
            this.productosRegistrados.push({ ...productoActualizado });
          }
  
          this.cancelar(); // Limpia el formulario después de registrar
        },
        error => {
          console.error('Error al actualizar el producto:', error);
        }
      );
    }
  }

  cancelar(): void {
    this.selectedProduct = new Producto(); // Reinicializar selectedProduct
    this.cantidadExistencia = 0;
  }
}