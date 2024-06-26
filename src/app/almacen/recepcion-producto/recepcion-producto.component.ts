import { Component, OnInit } from '@angular/core';
import { Producto } from '../../core/models/Producto';
import { ProductoService } from '../../core/services/producto.service';

@Component({
  selector: 'app-recepcion-producto',
  templateUrl: './recepcion-producto.component.html',
  styleUrl: './recepcion-producto.component.css'
})
export class RecepcionProductoComponent implements OnInit {

  productosRegistrados: Producto[] = [];
  nuevoProducto: Producto = new Producto();

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.obtenerProductosRegistrar();
  }

  obtenerProductosRegistrar(): void {
    this.productoService.obtenerProductos().subscribe(
      (datos: Producto[]) => {
        this.productosRegistrados = datos;
      },
      (error) => {
        console.error('Error al obtener productos', error);
      }
    );
  }

  guardarProducto(): void {
    // Validar antes de guardar, por ejemplo, asegurar que la cantidad recibida sea mayor que cero
    if (this.nuevoProducto.cantidadExistencia <= 0) {
      alert('La cantidad recibida debe ser mayor que cero.');
      return;
    }

    // Llamar al servicio para agregar el nuevo producto
    this.productoService.agregarProducto(this.nuevoProducto).subscribe(
      (productoAgregado: Producto) => {
        this.productosRegistrados.push(productoAgregado); // Agregar a la lista de productos registrados
        this.nuevoProducto = new Producto(); // Limpiar formulario después de agregar
      },
      (error) => {
        console.error('Error al agregar producto', error);
      }
    );
  }

  // Boton eliminar:
  eliminarProducto(id: number) {
    this.productoService.eliminarProducto(id).subscribe(
      () => {
        this.obtenerProductosRegistrar(); // Actualizar la lista de productos después de eliminar
      },
      (error) => {
        console.error('Error al eliminar producto', error);
      }
    );
  }

  cancelar(): void {
    this.nuevoProducto = new Producto(); // Limpiar formulario al cancelar
  }
}